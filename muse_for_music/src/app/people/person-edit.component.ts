import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { ApiService } from '../shared/rest/api.service';
import { ApiObject } from '../shared/rest/api-base.service';

@Component({
  selector: 'm4m-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.scss']
})
export class PersonEditComponent implements OnInit, OnChanges {

    @Input() personID: number;
    person: ApiObject = {
        _links: {'self':{'href':''}},
        name: 'UNBEKANNT'
    };

    valid: boolean = false;
    data: any = {};

    constructor(private api: ApiService) { }

    update() {
        this.api.getPerson(this.personID).subscribe(data => {
            this.person = data;
        });
    }

    ngOnInit(): void {
        this.update();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.update();
    }

    onValidChange(valid: boolean) {
        this.valid = valid;
    }

    onDataChange(data: any) {
        this.data = data;
    }

    save(event) {
        if (this.valid) {
            this.api.putPerson(this.personID, this.data);
        }
    }

}