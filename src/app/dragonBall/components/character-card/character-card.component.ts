import { TitleCasePipe } from '@angular/common';
import { Character } from './../../interfaces/character-interface';
import { Component, computed, effect, ElementRef, input, OnInit, signal, viewChild, ViewChild } from '@angular/core';
import { CharacterModalComponent } from "./character-modal/character-modal.component";

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.css'],
  imports: [TitleCasePipe, CharacterModalComponent]
})
export class CharacterCardComponent {
  character=input.required<Character>();
  openModal = signal(false);


  characterProperties = computed(() => {
    return Object.entries(this.character())
    .map(([key,value])=>{return {key,value}})
    .filter((value)=>value.key!='image' && value.key!='deletedAt' && value.key!='id');
    
    [['image','url'],['name','goku'],['id',1]]

    // [{
    //   'image':'url',
    // },
    // {
    //   'name':'goku'
    // }]

    
  });

  image = computed(() => {
    return this.character().image;
  });

  

  

}
