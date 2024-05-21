class Backend {
  backendMarkers = [];
  idForNewMarker = 0;
  get() {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.backendMarkers = localStorage.markers
          ? JSON.parse(localStorage.markers)
          : [];
        this.idForNewMarker = this.backendMarkers.length
          ? this.backendMarkers.length
          : 0;
        resolve(this.backendMarkers);
      }, 3000);
    });
  }
  post(newMarker) {
    this.idForNewMarker += 1;
    const addedMarker = {
      ...newMarker,
      id: this.idForNewMarker,
    };
    return new Promise((resolve) => {
      setTimeout(() => {
        const oldListMarkers = localStorage.markers
          ? JSON.parse(localStorage.markers)
          : [];
        localStorage.markers = JSON.stringify([...oldListMarkers, addedMarker]);
        resolve();
      }, 3000);
    });
  }
}
export const HTTP = new Backend();
