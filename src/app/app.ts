///<reference path="../../typings/browser.d.ts"/>

import {bootstrap} from "angular2/platform/browser";
import {Component, ElementRef, ViewEncapsulation, Pipe, PipeTransform} from "angular2/core";
import {NgFor} from "angular2/common";
import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS, MdDialog} from "ng2-material/all";
import {DOM} from "angular2/src/platform/dom/dom_adapter";
import {MdDialogConfig, MdDialogBasic, MdDialogRef} from "ng2-material/components/dialog/dialog";
import * as _ from "lodash";

@Pipe({name: "eePrettifyBytes"})
class PrettifyBytes implements PipeTransform {
  transform(bytes, args) {
    let i = 0, sizes = ["Bytes", "KiB", "MiB", "GiB", "TiB"];
    for ( ; bytes > 1024 && i < 5; bytes /= 1024, i++);

    return bytes.toFixed(2) + " " + sizes[i];
  }
}

@Component({
  selector: "ee-app",
  pipes: [PrettifyBytes],
  directives: [MATERIAL_DIRECTIVES],
  providers: [MATERIAL_PROVIDERS],
  template: require("./app.component.html"),
  styles: [require("./app.scss")],
  encapsulation: ViewEncapsulation.None
})

export default class App {
  images: Array<Object> = [];
  totalSize: number = 0;

  constructor(public dialog: MdDialog, public element: ElementRef) {
  }

  deleteItem(item: File) {
    this.totalSize -= item.size;
    _.remove(this.images, (n) => {
      if (item === n) return true;
    });
  }

  handleDrop(e) {
    _.map(e.dataTransfer.files, (file: File) => {
      if (file.type === "image/png" || file.type === "image/jpeg") {
        this.images.push(file);
        this.totalSize += file.size;
      }
    });

    return false;
  }

  showAlert(title, text) {
    let config = new MdDialogConfig()
    .textContent(text)
    .title(title)
    .ok("OK");

    this.dialog.open(MdDialogBasic, this.element, config);
  };
}

bootstrap(App);