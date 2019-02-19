import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NavigationService, Breadcrumb } from '../navigation/navigation-service';
import { ApiService } from '../shared/rest/api.service';
import { ApiObject } from '../shared/rest/api-base.service';
import { TableRow } from '../shared/table/table.component';

@Component({
  selector: 'm4m-people-overview',
  templateUrl: './people-overview.component.html',
  styleUrls: ['./people-overview.component.scss'],
  providers: [DatePipe]
})
export class PeopleOverviewComponent implements OnInit {

    valid: boolean;
    newPersonData: any;

    persons: Array<ApiObject>;
    tableData: TableRow[];
    selected: number;

    swagger: any;

    constructor(private data: NavigationService, private api: ApiService, private datePipe: DatePipe) { }

    ngOnInit(): void {
        this.data.changeTitle('Personen');
        this.data.changeBreadcrumbs([new Breadcrumb('Personen', '/people')]);
        this.api.getPeople().subscribe(data => {
            if (data == undefined) {
                return;
            }
            this.persons = data;
            const tableData = [];
            let selected;
            this.persons.forEach(person => {
                if (this.selected == null || this.selected !== selected) {
                    selected = person.id;
                }
                let birth = person.birth_date + ' *';
                let death = person.death_date + ' ✝';
                if (person.birth_date < 0) {
                    birth = 'na';
                }
                if (person.death_date < 0) {
                    death = 'na';
                }
                const row = new TableRow(person.id, [person.name, person.gender,
                    birth + ' – ' + death]);
                tableData.push(row);
            });
            this.selected = selected;
            this.tableData = tableData;
        });
    }

    save = () => {
        if (this.valid) {
            this.api.postPerson(this.newPersonData).subscribe(person => {
                this.selected = person.id;
            });
        }
    };

    onValidChange(valid: boolean) {
        this.valid = valid;
    }

    onDataChange(data: any) {
        this.newPersonData = data;
    }

    selectPerson(event, person: ApiObject) {
        this.selected = person.id;
    }

}
