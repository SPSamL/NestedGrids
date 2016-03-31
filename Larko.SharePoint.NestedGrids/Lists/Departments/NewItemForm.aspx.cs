using System;
using Microsoft.SharePoint;
using Microsoft.SharePoint.WebControls;
using Microsoft.SharePoint.WebPartPages;

namespace Larko.SharePoint.NestedGrids
{
    public partial class NewItemForm : WebPartPage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
        }

        protected override void CreateChildControls()
        {
            base.CreateChildControls();

            int parentId = int.Parse(Request.QueryString["ParentID"]);
            NewChildItemControl newItemControl = Page.LoadControl(@"/_CONTROLTEMPLATES/Larko.SharePoint.NestedGrids/NewChildItemControl.ascx") as NewChildItemControl;
            newItemControl.ID = "newItemControl";
            newItemControl.ListName = "Departments";
            newItemControl.ParentField = "School";
            newItemControl.ParentID = parentId;
            NewItemControlPlaceHolder.Controls.Add(newItemControl);
        }
    }
}
