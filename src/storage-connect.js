export class StorageConnect {
  constructor(storage) {
    this.storage = storage;
  }

  setElementValue(element, key) {
    if (!this.storage.getItem(key)) {
      element.value = "";
    } else {
      element.value = this.storage.getItem(key);
    }
  }

  setStorageValue(element, key) {
    this.storage.setItem(key, element.value);
  }
}
