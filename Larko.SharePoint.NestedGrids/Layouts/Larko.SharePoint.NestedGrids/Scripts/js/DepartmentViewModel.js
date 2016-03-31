var Larko;
(function (Larko) {
    var SharePoint;
    (function (SharePoint) {
        var NestedGrids;
        (function (NestedGrids) {
            var DepartmentViewModel = (function () {
                function DepartmentViewModel(id, name, departmentHead, departmentId, isEditing, isExpanded) {
                    this.editTransaction = new ko.subscribable();
                    this.editingItem = ko.observable();
                    this.department = ko.observable(new NestedGrids.Department(id, name, departmentHead, departmentId, isEditing, isExpanded));
                }
                DepartmentViewModel.prototype.isDepartmentEditing = function (currentDepartment) {
                    return currentDepartment === this.editingItem();
                };
                //#endregion
                //#region Events
                DepartmentViewModel.prototype.saveDepartment = function (department) {
                    this.editTransaction.notifySubscribers(null, "commit");
                    var currentVM = this;
                    currentVM.updateListItem(department).then(function () {
                        currentVM.editingItem(null);
                    }, function (sender, args) {
                        NestedGrids.Utilities.onQueryFailed(sender, args, "Failed to update Department: " + department.name());
                    });
                };
                DepartmentViewModel.prototype.cancelDepartment = function (department) {
                    this.editTransaction.notifySubscribers(null, "commit");
                    this.editingItem(null);
                };
                DepartmentViewModel.prototype.editDepartment = function (department) {
                    department.beginEdit(this.editTransaction);
                    this.editingItem(department);
                };
                DepartmentViewModel.prototype.deleteDepartment = function (department) {
                    this.deleteListItem(department).then(function () {
                        return;
                    }, function (sender, args) {
                        NestedGrids.Utilities.onQueryFailed(sender, args, "Failed to delete Department: " + department.name());
                    });
                };
                DepartmentViewModel.prototype.expandDepartment = function (currentDepartment) {
                    if (this.department().isExpanded()) {
                        this.department().isExpanded(false);
                    }
                    else {
                        //currentDepartment.isExpanded(true);
                        //this.departmentGrid = new NestedGrids.DepartmentGridViewModel(this.department());
                        //this.departmentGrid.loadGrid();
                        this.department().isExpanded(true);
                    }
                };
                DepartmentViewModel.prototype.getDepartmentTemplate = function (currentDepartment) {
                    if (currentDepartment.isEditing()) {
                        return "departmentEditTemplate";
                    }
                    else {
                        return "departmentReadTemplate";
                    }
                };
                //#endregion
                //#region Data
                DepartmentViewModel.prototype.updateListItem = function (department) {
                    var deferred = $.Deferred();
                    var clientContext = new SP.ClientContext();
                    var oList = clientContext.get_web().get_lists().getByTitle(NestedGrids.Constants.Lists.Departments.displayName);
                    var updateItem = oList.getItemById(department.id);
                    updateItem.set_item(NestedGrids.Constants.Lists.Departments.Fields.Title.internalName, department.name());
                    updateItem.set_item(NestedGrids.Constants.Lists.Departments.Fields.DepartmentHead.internalName, department.departmentHead());
                    updateItem.update();
                    clientContext.executeQueryAsync(Function.createDelegate(this, function () { deferred.resolve(this.updateItem); }), Function.createDelegate(this, function (sender, args) { deferred.reject(sender, args); }));
                    return deferred.promise();
                };
                DepartmentViewModel.prototype.deleteListItem = function (department) {
                    var deferred = $.Deferred();
                    var clientContext = new SP.ClientContext();
                    var oList = clientContext.get_web().get_lists().getByTitle(NestedGrids.Constants.Lists.Departments.displayName);
                    var oListItem = oList.getItemById(department.id);
                    oListItem.deleteObject();
                    clientContext.executeQueryAsync(Function.createDelegate(this, function () { deferred.resolve(this.updateItem); }), Function.createDelegate(this, function (sender, args) { deferred.reject(sender, args); }));
                    return deferred.promise();
                };
                return DepartmentViewModel;
            }());
            NestedGrids.DepartmentViewModel = DepartmentViewModel;
        })(NestedGrids = SharePoint.NestedGrids || (SharePoint.NestedGrids = {}));
    })(SharePoint = Larko.SharePoint || (Larko.SharePoint = {}));
})(Larko || (Larko = {}));
//# sourceMappingURL=DepartmentViewModel.js.map