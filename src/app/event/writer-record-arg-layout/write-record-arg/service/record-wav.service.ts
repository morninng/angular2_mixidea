import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';


declare var Recorder:any;

@Injectable()
export class RecordWavService {

  audio_source$ = new Subject<any>();

  recorder : any;
  enc_worker : any;
  recorder_worker: any;
  recording : boolean;
  node : any;
  audio_queue : any;


  constructor() { 
    console.log("record wav service");
  }


  update_setting(source : any, cfg : any){

    console.log(cfg);
    const config = cfg || {};
    const bufferLen = config.bufferLen || 4096;
    const numChannels = config.numChannels || 2;
    const context = source.context;
    this.recorder_worker = new Worker('js/recorderWorker.js');
    this.recorder_worker.postMessage({
      command: 'init',
      config: {
        sampleRate: context.sampleRate,
        numChannels: numChannels
      }
    });
    this.recording = false;

    this.node = (context.createScriptProcessor || context.createJavaScriptNode).call(context, bufferLen, numChannels, numChannels);

    this.node.onaudioprocess = (e)=>{
      if (!this.recording){
        return;
      }
      var buffer = [];
      for (var channel = 0; channel < numChannels; channel++){
          buffer.push(e.inputBuffer.getChannelData(channel));
      }
      this.recorder_worker.postMessage({
        command: 'record',
        buffer: buffer
      });
    }
    source.connect(this.node);
    this.node.connect(context.destination);

    this.recorder_worker.onmessage = (e)=>{
      console.log("recorder worker onmessage", e);
      switch(e.data.command){
        case 'record_done':
          console.log("record done in recorder wav service");
          let audio_blob = e.data.audio_blob;
          this.audio_source$.next(audio_blob);
          this.recorder_worker.postMessage({ command: 'clear' });
        break;
      }
    }
  }

  start_record(){
    console.log("start record is called in recorder-wav service");
    this.recording = true;
  }

  stop_record(){
    this.recording = false;
    this.recorder_worker.postMessage({
      command: 'exportWAV', type: "audio/wav"
    });
  }

  clear(){
      this.recorder_worker.postMessage({ command: 'clear' });
  }
  
  exportWAV(cb, type){
      this.recorder_worker.postMessage({command: 'exportWAV',type: type});
  }


}
