import { Component } from '@angular/core';
import { Animal } from './animal';
import { AnimalService } from './animal.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	selectedAnimal: Animal | null = null;
	showCats: boolean = true;

	constructor(private animalService: AnimalService) { }

	get animals(): Animal[] {
		return this.showCats
			? this.animalService.getAnimals()
			: this.animalService.getAnimals().filter(animal => animal.type !== 'Cat');
	}

	onSelect(animal: Animal): void {
		this.selectedAnimal = this.selectedAnimal === animal ? null : animal;
	}

	toggleCats(): void {
		this.showCats = !this.showCats;
	}
}