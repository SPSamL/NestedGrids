module Larko.SharePoint.NestedGrids {
    export class Major {
        public name: string;
        public hoursRequired: number;
        public degreeType: string;
        public id: number;
        public departmentId: number;
    }

    export class Faculty {
        public name: string;
        public yearsTeaching: number;
        public departmentId: number;
        public id: number;
    }

    export class Department {
        public name: KnockoutObservable<string>;
        public departmentHead: KnockoutObservable<string>;
        public schoolId: KnockoutObservable<number>;
        public id: number;

        public isEditing: KnockoutObservable<boolean>;
        public isExpanded: KnockoutObservable<boolean>;

        public searchableFields: Array<SearchField>;
        
        constructor(id: number, name: string, departmentHead: string, schoolId: number, isEditing: boolean, isExpanded: boolean) {
            this.name = ko.observable<string>(name).extend({ editable: true });
            this.departmentHead = ko.observable<string>(departmentHead).extend({ editable: true });
            this.schoolId = ko.observable<number>(schoolId).extend({ editable: true });
            this.id = id;

            this.isEditing = ko.observable<boolean>(isEditing);
            this.isExpanded = ko.observable<boolean>(isExpanded);

            this.createSearchableFields();
        }

        private createSearchableFields() {
            this.searchableFields = new Array<SearchField>();

            this.searchableFields.push({
                fieldName: "name",
                isObservable: true,
                type: "string"
            });

            this.searchableFields.push({
                fieldName: "departmentHead",
                isObservable: true,
                type: "string"
            });
        }

        beginEdit(transaction) {
            this.name.beginEdit(transaction);
            this.departmentHead.beginEdit(transaction);
            this.schoolId.beginEdit(transaction);
        }

        toJSON() {
            var copy = ko.toJS(this);
            return copy;
        }
    }

    export class School {
        public name: KnockoutObservable<string>;
        public location: KnockoutObservable<string>;
        public yearOpened: KnockoutObservable<string>;
        public dean: KnockoutObservable<string>;
        public id: number;

        public isEditing: KnockoutObservable<boolean>;
        public isExpanded: KnockoutObservable<boolean>;

        public searchableFields: Array<SearchField>;

        constructor(name: string, location: string, yearOpened: string, dean: string, id: number, isEditing: boolean, isExpanded: boolean) {
            this.name = ko.observable<string>(name).extend({ editable: true });
            this.location = ko.observable<string>(location).extend({ editable: true });
            this.yearOpened = ko.observable<string>(yearOpened).extend({ editable: true });
            this.dean = ko.observable<string>(dean).extend({ editable: true });
            this.isEditing = ko.observable<boolean>(isEditing);
            this.isExpanded = ko.observable<boolean>(isExpanded);
            this.id = id;

            this.createSearchableFields();
        }

        private createSearchableFields() {
            this.searchableFields = new Array<SearchField>();

            this.searchableFields.push({
                fieldName: "name",
                isObservable: true,
                type: "string"
            });

            this.searchableFields.push({
                fieldName: "location",
                isObservable: true,
                type: "string"
            });

            this.searchableFields.push({
                fieldName: "yearOpened",
                isObservable: true,
                type: "string"
            });

            this.searchableFields.push({
                fieldName: "dean",
                isObservable: true,
                type: "string"
            });
        }

        beginEdit(transaction) {
            this.name.beginEdit(transaction);
            this.location.beginEdit(transaction);
            this.yearOpened.beginEdit(transaction);
            this.dean.beginEdit(transaction);
        }

        toJSON() {
            var copy = ko.toJS(this);
            return copy;
        }
    }

    export class Course {
        public name: string;
        public level: number;
        public departmentId: number;
        public id: number;
    }

    export class Filter {
        public field: string;
        public value: string;
    }

    export class Sort {
        public sortField: string;
        public sortAsc: boolean;
    }

    export class SearchField {
        public fieldName: string;
        public isObservable: boolean;
        public type: string;
    }
}