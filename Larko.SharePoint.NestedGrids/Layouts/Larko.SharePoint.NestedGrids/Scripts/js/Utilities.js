var Larko;
(function (Larko) {
    var SharePoint;
    (function (SharePoint) {
        var NestedGrids;
        (function (NestedGrids) {
            var Utilities;
            (function (Utilities) {
                function isObjectNullorUndefined(object) {
                    /// <summary>
                    /// Checks if the object is null or undefined.
                    /// </summary>
                    /// <param name="object" type="Object">Object to test.</param>
                    /// <returns type="boolean">True if either matches.</returns>
                    if (object == null || object == undefined)
                        return true;
                    else
                        return false;
                }
                Utilities.isObjectNullorUndefined = isObjectNullorUndefined;
                function localTest() {
                }
                function sortEvaluation(sortField, left, right) {
                    for (var i = 0; i < left.searchableFields.length; i++) {
                        var searchField = left.searchableFields[i];
                        var leftFieldValue, rightFieldValue;
                        if (searchField.isObservable) {
                            leftFieldValue = left[searchField.fieldName]();
                            rightFieldValue = right[searchField.fieldName]();
                        }
                        else {
                            leftFieldValue = left[searchField.fieldName];
                            rightFieldValue = right[searchField.fieldName];
                        }
                        if (sortField.sortField == searchField.fieldName) {
                            if (sortField.sortAsc)
                                return leftFieldValue == rightFieldValue ? 0 : (leftFieldValue < rightFieldValue ? -1 : 1);
                            else
                                return leftFieldValue == rightFieldValue ? 0 : (leftFieldValue > rightFieldValue ? -1 : 1);
                        }
                    }
                    alert(sortField.sortField + " does not exist on Type: " + typeof left);
                }
                Utilities.sortEvaluation = sortEvaluation;
                function isSearchStringFound(item, searchText) {
                    var retVal = false;
                    for (var i = 0; i < item.searchableFields.length; i++) {
                        var searchField = item.searchableFields[i];
                        var fieldValue;
                        if (searchField.isObservable)
                            fieldValue = item[searchField.fieldName]();
                        else
                            fieldValue = item[searchField.fieldName];
                        if (typeof fieldValue == "number" && !isNaN(Number(searchText)) && fieldValue == Number(searchText)) {
                            retVal = true;
                            break;
                        }
                        else if (typeof fieldValue == "string") {
                            if (fieldValue.toLowerCase().indexOf(searchText.trim().toLowerCase()) > -1) {
                                retVal = true;
                                break;
                            }
                        }
                    }
                    return retVal;
                }
                Utilities.isSearchStringFound = isSearchStringFound;
                function isItemFilteredFromData(item, filters) {
                    /// <summary>
                    /// Checks if the item does not belong in displayed data based on filters.
                    /// </summary>
                    /// <param name="item">Data Object being tested.</param>
                    /// <param name="filters">Collection of filters applied.</param>
                    /// <returns type="boolean">True if no filters applied or matches filters data.</returns>
                    var retVal = true;
                    for (var i = 0; i < filters.length; i++) {
                        var searchableField = ko.utils.arrayFirst(item.searchableFields, function (field) {
                            if (field.fieldName == filters[i].field)
                                return true;
                            else
                                return false;
                        });
                        if (searchableField) {
                            var filterField = filters[i].field;
                            var filterValue = filters[i].value;
                            var fieldValue;
                            if (searchableField.isObservable)
                                fieldValue = item[searchableField.fieldName]();
                            else
                                fieldValue = item[searchableField.fieldName];
                            if (filterValue !== fieldValue) {
                                retVal = false;
                                break;
                            }
                        }
                    }
                    return retVal;
                }
                Utilities.isItemFilteredFromData = isItemFilteredFromData;
                function onQueryFailed(sender, args, message) {
                    var stack = "";
                    if (!isObjectNullorUndefined(args.get_stackTrace()))
                        stack = args.get_stackTrace();
                    toastr.error('Request failed. ' + args.get_message() + '<br />' + stack, message, {
                        allowHtml: true,
                        positionClass: "toast-top-center",
                        showMethod: "fadeIn",
                        hideMethod: "fadeOut"
                    });
                }
                Utilities.onQueryFailed = onQueryFailed;
                function ShowDialog(listName, parentId, gridObject) {
                    var url = "http://portal.contoso.com/sites/spssa/Lists/" + listName + "/NewForm.aspx?IsDlg=1";
                    if (listName !== "School")
                        url += "&ParentID=" + parentId;
                    SP.UI.ModalDialog.showModalDialog({
                        url: url,
                        width: 700,
                        height: 700,
                        dialogReturnValueCallback: function () {
                            newFormCallback(listName, gridObject);
                        }
                    });
                    return false;
                }
                Utilities.ShowDialog = ShowDialog;
                function newFormCallback(listName, gridObject) {
                    switch (listName) {
                        case "Departments":
                            gridObject.loadGrid();
                            break;
                        case "Schools":
                            gridObject.loadGrid();
                            break;
                        default:
                            break;
                    }
                }
                Utilities.newFormCallback = newFormCallback;
            })(Utilities = NestedGrids.Utilities || (NestedGrids.Utilities = {}));
        })(NestedGrids = SharePoint.NestedGrids || (SharePoint.NestedGrids = {}));
    })(SharePoint = Larko.SharePoint || (Larko.SharePoint = {}));
})(Larko || (Larko = {}));
//# sourceMappingURL=Utilities.js.map