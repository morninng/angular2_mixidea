import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';


declare var window:any;
declare var Recorder:any;


@Injectable()
export class RecordWavService {

  audio_source$ = new Subject<any>();

  recorder_worker: any;
  recording : boolean = false;
  script_node :any;
  numChannels = 1;
  audioCtx : any;
  mediastream_sourcenode : any;


  constructor() {}


  initialize_audio_context(mediastream_sourcenode){

    this.mediastream_sourcenode = mediastream_sourcenode;
    this.audioCtx = this.mediastream_sourcenode.context;

   this.script_node = (this.audioCtx.createScriptProcessor || this.audioCtx.createJavaScriptNode)
                          .call(this.audioCtx, 4096, this.numChannels, this.numChannels);     

    this.script_node.onaudioprocess = (e)=>{
      if (!this.recording){
        return;
      }
      var buffer = [];
      for (var channel = 0; channel < this.numChannels; channel++){
          buffer.push(e.inputBuffer.getChannelData(channel));
      }
      this.recorder_worker.postMessage({
        command: 'record',
        buffer: buffer
      });
    }
  }

  initialize_worker(){

    this.recorder_worker = new Worker('js/recorderWorker.js');

    var sampleRate = this.audioCtx.sampleRate;
    this.recorder_worker.postMessage({
      command: 'init',
      config: {
        sampleRate: sampleRate,
        numChannels: this.numChannels
      }
    });

   this.recorder_worker.onmessage = (e)=>{
      console.log("recorder worker onmessage", e);
      switch(e.data.command){
        case 'record_done':
          console.log("record done in recorder wav service");
          const audio_blob = e.data.audio_blob;
          this.audio_source$.next(audio_blob);
          this.finalize();
        break;
      }
    }
  }
  
  start_record(){
    this.initialize_worker();
    this.mediastream_sourcenode.connect(this.script_node);
    this.script_node.connect(this.audioCtx.destination);
    this.recording = true;
  }

  stop_record(){
    this.recording = false;
    this.recorder_worker.postMessage({
      command: 'exportWAV', type: "audio/wav"
    });
    this.mediastream_sourcenode.disconnect(this.script_node);
    this.script_node.disconnect(this.audioCtx.destination);
  }

  clear(){
      this.recorder_worker.postMessage({ command: 'clear' });
  }
  
  exportWAV(cb, type){
      this.recorder_worker.postMessage({command: 'exportWAV',type: type});
  }

  finalize(){
    this.recording = false;
    if(this.recorder_worker){
      this.recorder_worker.postMessage({ command: 'clear' });
      this.recorder_worker.terminate();
      this.recorder_worker = null;
    }
  }


}
