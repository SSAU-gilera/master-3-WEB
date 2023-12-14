import { Injectable } from '@angular/core';
import { Animal } from './animal';

@Injectable({
	providedIn: 'root',
})
export class AnimalService {
	private animals: Animal[] = [
		new Animal('Cat', 'Вискас', 3, 'Сфинкс', 'Коричневый', true),
		new Animal('Dog', 'Чакки', 5, 'Доберман', 'Чёрный', true),
	];

	getAnimals(): Animal[] {
		return this.animals;
	}
}