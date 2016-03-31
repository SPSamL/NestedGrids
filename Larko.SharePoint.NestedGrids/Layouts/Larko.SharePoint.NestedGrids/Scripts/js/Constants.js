var Larko;
(function (Larko) {
    var SharePoint;
    (function (SharePoint) {
        var NestedGrids;
        (function (NestedGrids) {
            var Constants;
            (function (Constants) {
                Constants.fieldDelimiter = "#;";
                var Lists;
                (function (Lists) {
                    var Schools;
                    (function (Schools) {
                        Schools.displayName = "Schools";
                        Schools.urlName = "Schools";
                        var Fields;
                        (function (Fields) {
                            var Id;
                            (function (Id) {
                                Id.internalName = "ID";
                                Id.displayName = "ID";
                            })(Id = Fields.Id || (Fields.Id = {}));
                            var Title;
                            (function (Title) {
                                Title.internalName = "Title";
                                Title.displayName = "School Name";
                            })(Title = Fields.Title || (Fields.Title = {}));
                            var Location;
                            (function (Location) {
                                Location.internalName = "Location1";
                                Location.displayName = "Location";
                            })(Location = Fields.Location || (Fields.Location = {}));
                            var YearOpened;
                            (function (YearOpened) {
                                YearOpened.internalName = "YearOpened";
                                YearOpened.displayName = "Year Opened";
                            })(YearOpened = Fields.YearOpened || (Fields.YearOpened = {}));
                            var Dean;
                            (function (Dean) {
                                Dean.internalName = "Dean";
                                Dean.displayName = "Dean";
                            })(Dean = Fields.Dean || (Fields.Dean = {}));
                        })(Fields = Schools.Fields || (Schools.Fields = {}));
                    })(Schools = Lists.Schools || (Lists.Schools = {}));
                    var Departments;
                    (function (Departments) {
                        Departments.displayName = "Departments";
                        Departments.urlName = "Departments";
                        var Fields;
                        (function (Fields) {
                            var Id;
                            (function (Id) {
                                Id.internalName = "ID";
                                Id.displayName = "ID";
                            })(Id = Fields.Id || (Fields.Id = {}));
                            var Title;
                            (function (Title) {
                                Title.internalName = "Title";
                                Title.displayName = "School Name";
                            })(Title = Fields.Title || (Fields.Title = {}));
                            var DepartmentHead;
                            (function (DepartmentHead) {
                                DepartmentHead.internalName = "DepartmentHead";
                                DepartmentHead.displayName = "Department Head";
                            })(DepartmentHead = Fields.DepartmentHead || (Fields.DepartmentHead = {}));
                            var School;
                            (function (School) {
                                School.internalName = "School";
                                School.displayName = "School";
                            })(School = Fields.School || (Fields.School = {}));
                        })(Fields = Departments.Fields || (Departments.Fields = {}));
                    })(Departments = Lists.Departments || (Lists.Departments = {}));
                    var Majors;
                    (function (Majors) {
                        Majors.displayName = "Majors";
                        Majors.urlName = "Majors";
                    })(Majors = Lists.Majors || (Lists.Majors = {}));
                    var Faculty;
                    (function (Faculty) {
                        Faculty.displayName = "Faculty";
                        Faculty.urlName = "Faculty";
                    })(Faculty = Lists.Faculty || (Lists.Faculty = {}));
                    var Courses;
                    (function (Courses) {
                        Courses.displayName = "Courses";
                        Courses.urlName = "Courses";
                    })(Courses = Lists.Courses || (Lists.Courses = {}));
                })(Lists = Constants.Lists || (Constants.Lists = {}));
            })(Constants = NestedGrids.Constants || (NestedGrids.Constants = {}));
        })(NestedGrids = SharePoint.NestedGrids || (SharePoint.NestedGrids = {}));
    })(SharePoint = Larko.SharePoint || (Larko.SharePoint = {}));
})(Larko || (Larko = {}));
var Larko;
(function (Larko) {
    var SharePoint;
    (function (SharePoint) {
        var SPSDemo;
        (function (SPSDemo) {
            var Constants;
            (function (Constants) {
                Constants.fieldDelimiter = "#;";
                var Lists;
                (function (Lists) {
                    var Schools;
                    (function (Schools) {
                        Schools.displayName = "Schools";
                        Schools.urlName = "Schools";
                        var Fields;
                        (function (Fields) {
                            var Id;
                            (function (Id) {
                                Id.internalName = "ID";
                                Id.displayName = "ID";
                            })(Id = Fields.Id || (Fields.Id = {}));
                            var Title;
                            (function (Title) {
                                Title.internalName = "Title";
                                Title.displayName = "School Name";
                            })(Title = Fields.Title || (Fields.Title = {}));
                            var Location;
                            (function (Location) {
                                Location.internalName = "Location1";
                                Location.displayName = "Location";
                            })(Location = Fields.Location || (Fields.Location = {}));
                            var YearOpened;
                            (function (YearOpened) {
                                YearOpened.internalName = "YearOpened";
                                YearOpened.displayName = "Year Opened";
                            })(YearOpened = Fields.YearOpened || (Fields.YearOpened = {}));
                            var Dean;
                            (function (Dean) {
                                Dean.internalName = "Dean";
                                Dean.displayName = "Dean";
                            })(Dean = Fields.Dean || (Fields.Dean = {}));
                        })(Fields = Schools.Fields || (Schools.Fields = {}));
                    })(Schools = Lists.Schools || (Lists.Schools = {}));
                    var Departments;
                    (function (Departments) {
                        Departments.displayName = "Departments";
                        Departments.urlName = "Departments";
                        var Fields;
                        (function (Fields) {
                            var Id;
                            (function (Id) {
                                Id.internalName = "ID";
                                Id.displayName = "ID";
                            })(Id = Fields.Id || (Fields.Id = {}));
                            var Title;
                            (function (Title) {
                                Title.internalName = "Title";
                                Title.displayName = "School Name";
                            })(Title = Fields.Title || (Fields.Title = {}));
                            var DepartmentHead;
                            (function (DepartmentHead) {
                                DepartmentHead.internalName = "DepartmentHead";
                                DepartmentHead.displayName = "Department Head";
                            })(DepartmentHead = Fields.DepartmentHead || (Fields.DepartmentHead = {}));
                            var School;
                            (function (School) {
                                School.internalName = "School";
                                School.displayName = "School";
                            })(School = Fields.School || (Fields.School = {}));
                        })(Fields = Departments.Fields || (Departments.Fields = {}));
                    })(Departments = Lists.Departments || (Lists.Departments = {}));
                    var Majors;
                    (function (Majors) {
                        Majors.displayName = "Majors";
                        Majors.urlName = "Majors";
                    })(Majors = Lists.Majors || (Lists.Majors = {}));
                    var Faculty;
                    (function (Faculty) {
                        Faculty.displayName = "Faculty";
                        Faculty.urlName = "Faculty";
                    })(Faculty = Lists.Faculty || (Lists.Faculty = {}));
                    var Courses;
                    (function (Courses) {
                        Courses.displayName = "Courses";
                        Courses.urlName = "Courses";
                    })(Courses = Lists.Courses || (Lists.Courses = {}));
                })(Lists = Constants.Lists || (Constants.Lists = {}));
            })(Constants = SPSDemo.Constants || (SPSDemo.Constants = {}));
        })(SPSDemo = SharePoint.SPSDemo || (SharePoint.SPSDemo = {}));
    })(SharePoint = Larko.SharePoint || (Larko.SharePoint = {}));
})(Larko || (Larko = {}));
//# sourceMappingURL=Constants.js.map