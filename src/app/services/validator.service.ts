import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }

  isValidIpAddress(ipAddr: string): boolean{
    let blocks = ipAddr.trim().split('.');
    if(blocks.length != 4){
        return false;
    } else {
        let state = true;
        for(let block of blocks) {
            if (isNaN(Number(block)) || Number(block) < 0 || Number(block) > 255){
                state = false;
            }
        }
        return state;
    }
  }
}
