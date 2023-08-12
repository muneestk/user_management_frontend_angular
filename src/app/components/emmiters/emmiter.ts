import { EventEmitter } from "@angular/core";

export class Emmiter {
    static authEmitter = new EventEmitter<boolean>()
}