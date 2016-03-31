var Larko;
(function (Larko) {
    var SharePoint;
    (function (SharePoint) {
        var NestedGrids;
        (function (NestedGrids) {
            var SchoolViewModel = (function () {
                function SchoolViewModel(name, location, yearOpened, dean, id, isEditing, isExpanded) {
                    this.editTransaction = new ko.subscribable();
                    this.editingItem = ko.observable();
                    this.school = ko.observable(new NestedGrids.School(name, location, yearOpened, dean, id, isEditing, isExpanded));
                }
                SchoolViewModel.prototype.isSchoolEditing = function (currentSchool) {
                    return currentSchool === this.editingItem();
                };
                //#endregion
                //#region Events
                SchoolViewModel.prototype.saveSchool = function (school) {
                    this.editTransaction.notifySubscribers(null, "commit");
                    var currentVM = this;
                    currentVM.updateListItem(school).then(function () {
                        currentVM.editingItem(null);
                    }, function (sender, args) {
                        NestedGrids.Utilities.onQueryFailed(sender, args, "Failed to update Department: " + school.name());
                    });
                };
                SchoolViewModel.prototype.cancelSchool = function (school) {
                    this.editTransaction.notifySubscribers(null, "rollback");
                    this.editingItem(null);
                };
                SchoolViewModel.prototype.editSchool = function (school) {
                    school.beginEdit(this.editTransaction);
                    this.editingItem(school);
                };
                SchoolViewModel.prototype.deleteSchool = function (school) {
                    this.deleteListItem(school).then(function () {
                        return;
                    }, function (sender, args) {
                        NestedGrids.Utilities.onQueryFailed(sender, args, "Failed to delete School: " + school.name());
                    });
                };
                SchoolViewModel.prototype.expandSchool = function (currentSchool) {
                    if (this.school().isExpanded()) {
                        this.school().isExpanded(false);
                    }
                    else {
                        //currentSchool.isExpanded(true);
                        this.departmentGrid = new NestedGrids.DepartmentGridViewModel(this.school());
                        //this.departmentGrid.loadGrid();
                        this.school().isExpanded(true);
                    }
                };
                SchoolViewModel.prototype.getSchoolTemplate = function (currentSchool) {
                    if (currentSchool.isEditing()) {
                        return "schoolEditTemplate";
                    }
                    else {
                        return "schoolReadTemplate";
                    }
                };
                //#endregion
                //#region Data
                SchoolViewModel.prototype.updateListItem = function (school) {
                    var deferred = $.Deferred();
                    var clientContext = new SP.ClientContext();
                    var oList = clientContext.get_web().get_lists().getByTitle(NestedGrids.Constants.Lists.Schools.displayName);
                    var updateItem = oList.getItemById(school.id);
                    updateItem.set_item(NestedGrids.Constants.Lists.Departments.Fields.Title.internalName, school.name());
                    updateItem.set_item(NestedGrids.Constants.Lists.Schools.Fields.Dean.internalName, school.dean());
                    updateItem.update();
                    clientContext.executeQueryAsync(Function.createDelegate(this, function () { deferred.resolve(this.updateItem); }), Function.createDelegate(this, function (sender, args) { deferred.reject(sender, args); }));
                    return deferred.promise();
                };
                SchoolViewModel.prototype.deleteListItem = function (school) {
                    var deferred = $.Deferred();
                    var clientContext = new SP.ClientContext();
                    var oList = clientContext.get_web().get_lists().getByTitle(NestedGrids.Constants.Lists.Schools.displayName);
                    var oListItem = oList.getItemById(school.id);
                    oListItem.deleteObject();
                    clientContext.executeQueryAsync(Function.createDelegate(this, function () { deferred.resolve(this.updateItem); }), Function.createDelegate(this, function (sender, args) { deferred.reject(sender, args); }));
                    return deferred.promise();
                };
                return SchoolViewModel;
            }());
            NestedGrids.SchoolViewModel = SchoolViewModel;
        })(NestedGrids = SharePoint.NestedGrids || (SharePoint.NestedGrids = {}));
    })(SharePoint = Larko.SharePoint || (Larko.SharePoint = {}));
})(Larko || (Larko = {}));
//# sourceMappingURL=SchoolViewModel.js.map