import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class EncodeToMp3Service {


  encoderWorker;
  fileReader;
  test = "aaa";
  encode_done$ = new Subject<any>();
  under_encoding_subject = new BehaviorSubject(false);

  constructor() {}

  encode_wav_to_mp3(wav_blob){
    console.log("wav blob is passed for mp3 conversion");
    this.under_encoding_subject.next(true);

    const fileReader = new FileReader();
    fileReader.onload = () =>{
      const uint8_wav = new Uint8Array(fileReader.result);
      const wav_data = parseWav(uint8_wav);
      console.log("wav data");
      console.log(wav_data);
      console.log(this.test);
      this.encoderWorker = new Worker('js/mp3Worker.js');
      this.encoderWorker.postMessage({ 
        cmd: 'init', 
        config:{
          mode : 3,
          channels:1,
          samplerate: wav_data.sampleRate,
          bitrate: wav_data.bitsPerSample
          }
      });
      this.encoderWorker.postMessage({ cmd: 'encode', buf: Uint8ArrayToFloat32Array(wav_data.samples) });
  //    
      this.encoderWorker.onmessage = (e)=> {
        switch(e.data.cmd ){
          case 'data':
            const audio_mp3_unit8 = new Uint8Array(e.data.buf);
            console.log("--mp3 conversion done--");
            this.encode_done$.next(audio_mp3_unit8);
            this.under_encoding_subject.next(false);
          break;
        }
      }
    }
    fileReader.readAsArrayBuffer(wav_blob);
  }

  finalize(){
    if(this.encoderWorker){
      this.encoderWorker.postMessage({ cmd: 'finish'});
      this.encoderWorker.terminate();
      this.encoderWorker = null;
    }
  }



}



const parseWav = function(wav) {
  function readInt(i, bytes) {
    var ret = 0,
      shft = 0;

    while (bytes) {
      ret += wav[i] << shft;
      shft += 8;
      i++;
      bytes--;
    }
    return ret;
  }
  if (readInt(20, 2) != 1) throw 'Invalid compression code, not PCM';
  if (readInt(22, 2) != 1) throw 'Invalid number of channels, not 1';
  return {
    sampleRate: readInt(24, 4),
    bitsPerSample: readInt(34, 2),
    samples: wav.subarray(44)
  };
}


const Uint8ArrayToFloat32Array = function(u8a){
  var f32Buffer = new Float32Array(u8a.length);
  for (var i = 0; i < u8a.length; i++) {
    var value = u8a[i<<1] + (u8a[(i<<1)+1]<<8);
    if (value >= 0x8000) value |= ~0x7FFF;
    f32Buffer[i] = value / 0x8000;
  }
  return f32Buffer;
}