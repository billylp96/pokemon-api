import { Component, input, OnInit, signal } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
  imports: [RouterLink]
})
export class PaginatorComponent {
  currentPage=input.required<number>();
  totalPages=input.required<number>();
}
