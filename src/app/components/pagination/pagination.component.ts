import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { PAGE_SIZE } from '../../common/constants';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() collectionSize: number;
  @Input() pageSize: number = PAGE_SIZE;
  @Input() pageNumber: number;

  @Output() onPageChange = new EventEmitter<number>();
  @Output() onPageSizeChange = new EventEmitter<number>();

  pageSizes: number[] = [8, 10, 15, 20, 25, 30, 50, 100];

  constructor() { }

  ngOnInit() {
  }

}
