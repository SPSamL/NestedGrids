var Larko;
(function (Larko) {
    var SharePoint;
    (function (SharePoint) {
        var NestedGrids;
        (function (NestedGrids) {
            var Major = (function () {
                function Major() {
                }
                return Major;
            }());
            NestedGrids.Major = Major;
            var Faculty = (function () {
                function Faculty() {
                }
                return Faculty;
            }());
            NestedGrids.Faculty = Faculty;
            var Department = (function () {
                function Department(id, name, departmentHead, schoolId, isEditing, isExpanded) {
                    this.name = ko.observable(name).extend({ editable: true });
                    this.departmentHead = ko.observable(departmentHead).extend({ editable: true });
                    this.schoolId = ko.observable(schoolId).extend({ editable: true });
                    this.id = id;
                    this.isEditing = ko.observable(isEditing);
                    this.isExpanded = ko.observable(isExpanded);
                    this.createSearchableFields();
                }
                Department.prototype.createSearchableFields = function () {
                    this.searchableFields = new Array();
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
                };
                Department.prototype.beginEdit = function (transaction) {
                    this.name.beginEdit(transaction);
                    this.departmentHead.beginEdit(transaction);
                    this.schoolId.beginEdit(transaction);
                };
                Department.prototype.toJSON = function () {
                    var copy = ko.toJS(this);
                    return copy;
                };
                return Department;
            }());
            NestedGrids.Department = Department;
            var School = (function () {
                function School(name, location, yearOpened, dean, id, isEditing, isExpanded) {
                    this.name = ko.observable(name).extend({ editable: true });
                    this.location = ko.observable(location).extend({ editable: true });
                    this.yearOpened = ko.observable(yearOpened).extend({ editable: true });
                    this.dean = ko.observable(dean).extend({ editable: true });
                    this.isEditing = ko.observable(isEditing);
                    this.isExpanded = ko.observable(isExpanded);
                    this.id = id;
                    this.createSearchableFields();
                }
                School.prototype.createSearchableFields = function () {
                    this.searchableFields = new Array();
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
                };
                School.prototype.beginEdit = function (transaction) {
                    this.name.beginEdit(transaction);
                    this.location.beginEdit(transaction);
                    this.yearOpened.beginEdit(transaction);
                    this.dean.beginEdit(transaction);
                };
                School.prototype.toJSON = function () {
                    var copy = ko.toJS(this);
                    return copy;
                };
                return School;
            }());
            NestedGrids.School = School;
            var Course = (function () {
                function Course() {
                }
                return Course;
            }());
            NestedGrids.Course = Course;
            var Filter = (function () {
                function Filter() {
                }
                return Filter;
            }());
            NestedGrids.Filter = Filter;
            var Sort = (function () {
                function Sort() {
                }
                return Sort;
            }());
            NestedGrids.Sort = Sort;
            var SearchField = (function () {
                function SearchField() {
                }
                return SearchField;
            }());
            NestedGrids.SearchField = SearchField;
        })(NestedGrids = SharePoint.NestedGrids || (SharePoint.NestedGrids = {}));
    })(SharePoint = Larko.SharePoint || (Larko.SharePoint = {}));
})(Larko || (Larko = {}));
//# sourceMappingURL=DataObjects.js.map