

import { PipeTransform,Pipe } from "@angular/core";

@Pipe({
    name:'upperCase'
})


export class upperCase implements PipeTransform {
    transform(value:string) {
        return value.toUpperCase()
    }
}