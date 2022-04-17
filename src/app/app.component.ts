import { Component, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import structuredClone from '@ungap/structured-clone';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // title = 'killer-calc';
  totals:Array<Array<number>>;
  digits:Array<number>;

  total:number = 0;
  count:number = 0;

  results:Array<Array<number>>;

  constructor(private modalService: NgbModal) {
    this.totals = [...Array(9)].map((e, i) =>
      [...Array(5)].map((e, j) => i * 5 + j + 1)
    );

    this.digits = [...Array(9)].map((e, i) => i+1);

    this.results = [];
  }

  openModal(modal: TemplateRef<any>) {
    this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title'});
  }

  setTotal(num: number) {
    this.total = num;

    this.calculateResults();
  }

  setCount(num: number) {
    this.count = num;

    this.calculateResults();
  }

  toggleAttribute(event: any, name: string) {
    event.currentTarget?.toggleAttribute(name);
  }

  private calculateResults() {
    this.results = [];

    if (!this.total || !this.count) {
      return;
    }

    this.findResults(this.count, this.total);
  }

  private findResults(n: number, target: number, c:number = 1, result: Array<number> = []) {
    if (n == 0 && target == 0) {
      this.results.push(result);
    } else if (n > 0 && target > 0) {
      let i = result.length;

      for (let d = c; d <= 9; d++) {
        result[i] = d;
        this.findResults(n - 1, target - d, d + 1, structuredClone(result));
      }
    }
  }
}


