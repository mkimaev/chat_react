export default class DoorKey{
    id: number = 0;
    siteName: string = '';
    getDateTime: string = '';
    returnDateTime: string = '';
    location: 'on hand' | 'office' | 'lost' = 'office';
    lastUserAction: string = '';
    lastComment: string = '';
    gpo: string = '';
    history: string = '';
    coordinates: string = '';
    user?: string;

    get isInOffice(): boolean {
        return this.location === 'office' ? true : false;
    }
}
