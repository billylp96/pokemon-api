import { Component, inject, input, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from "@angular/router";

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
