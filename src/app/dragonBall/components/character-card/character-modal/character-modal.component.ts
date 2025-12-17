import { Component, computed, effect, ElementRef, inject, input, OnInit, output, viewChild } from '@angular/core';
import { Character } from '../../../interfaces/character-interface';
import { DbzService } from '../../../services/dbz.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-character-modal',
  templateUrl: './character-modal.component.html',
  styleUrls: ['./character-modal.component.css'],
  imports: [TitleCasePipe]
})
export class CharacterModalComponent {
  modal = viewChild<ElementRef<HTMLDialogElement>>('modal');
  characterId = input.required<number>();
  service = inject(DbzService)
  close = output<boolean>();

  characterResource = rxResource({
    params: () => ({ id: this.characterId() }),
    stream: ({ params }) => {
      return this.service.getCharacter(params.id)
    }
  });

  originPlanet = computed(() => {
    const originPlanet = this.characterResource.value()?.originPlanet;

    if (originPlanet) {
      return Object.entries(originPlanet)
        .map(([key, value]) => { return { key, value } })
        .filter(( object ) => object.value!= null && object.key!='id' && object.key!='image')
    }
    return []
  });

  transformationsArray = computed(() => {
    return this.characterResource.value()?.transformations;
  });

  // transformations = computed(() => {

  //   if (this.transformationsArray()) {
  //     return Object.entries(this.transformationsArray())
  //       .map(([key, value]) => { return { key, value } })
  //       .filter(({ key, value }) => value != null && key == 'id');
  //   }
  // });

  effects = effect(() => {
    this.openModal();
    this.service.getCharacter(this.characterId()).subscribe(res => console.log(res)
    );
  });

  // ngAfterViewInit() {
  //   this.modal()?.nativeElement.showModal();

  //   this.service.getCharacter(this.characterId())
  //     .subscribe(res => console.log(res));
  // }

  openModal() {
    this.modal()?.nativeElement.showModal()
  }

  closeModal() {
    this.modal()?.nativeElement.close()
    this.close.emit(false);
  }
}
