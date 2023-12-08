class Portfolio {
	constructor(name, date) {
		this._name = name;
		this._date = date;
		this._sessions = [];
	}

	// Остальное без изменений

	addSession(session) {
		this._sessions.push(session);
	}

	removeSession(session) {
		const index = this._sessions.indexOf(session);
		if (index !== -1) {
			this._sessions.splice(index, 1);
		}
	}

	editSession(oldSession, newSession) {
		const index = this._sessions.indexOf(oldSession);
		if (index !== -1) {
			this._sessions[index] = newSession;
		}
	}
}

class PhotoSession {
	constructor(name, model, genre) {
		this._name = name;
		this._model = model;
		this._genre = genre;
		this._photos = [];
	}

	// Остальное без изменений

	addPhoto(photo) {
		this._photos.push(photo);
	}

	removePhoto(photo) {
		const index = this._photos.indexOf(photo);
		if (index !== -1) {
			this._photos.splice(index, 1);
		}
	}

	editPhoto(oldPhoto, newPhoto) {
		const index = this._photos.indexOf(oldPhoto);
		if (index !== -1) {
			this._photos[index] = newPhoto;
		}
	}
}

class Photo {
	constructor(id, path) {
		this._id = id;
		this._path = path;
	}

	get id() {
		return this._id;
	}

	set id(newId) {
		this._id = newId;
	}

	get path() {
		return this._path;
	}

	set path(newPath) {
		this._path = newPath;
	}
}

class Genre {
	constructor(name, description) {
		this._name = name;
		this._description = description;
	}

	get name() {
		return this._name;
	}

	set name(newName) {
		this._name = newName;
	}

	get description() {
		return this._description;
	}

	set description(newDescription) {
		this._description = newDescription;
	}
}

class Model {
	constructor(name, phoneNumber) {
		this._name = name;
		this._phoneNumber = phoneNumber;
	}

	get name() {
		return this._name;
	}

	set name(newName) {
		this._name = newName;
	}

	get phoneNumber() {
		return this._phoneNumber;
	}

	set phoneNumber(newPhoneNumber) {
		this._phoneNumber = newPhoneNumber;
	}
}

module.exports = {
	Portfolio,
	PhotoSession,
	Photo,
	Genre,
	Model,
};