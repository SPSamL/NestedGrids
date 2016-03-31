using System;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using Microsoft.SharePoint;
using Microsoft.SharePoint.WebControls;

namespace Larko.SharePoint.NestedGrids
{
    public partial class NewChildItemControl : UserControl
    {
        public string ListName { get; set; }
        public int ParentID { get; set; }

        public string ParentField { get; set; }

        protected void Page_Load(object sender, EventArgs e)
        {
            SPWeb web = SPContext.Current.Web;
            SPContext.Current.FormContext.OnSaveHandler += new EventHandler(SaveHandler);

            SPList list = web.Lists.TryGetList(ListName);

            if (list != null)
            {
                this.listFieldIterator.ListId = list.ID;
                this.listFieldIterator.ExcludeFields = ParentField;
            }
        }

        private void SaveHandler(object sender, EventArgs e)
        {
            if (SPContext.Current.FormContext.FormMode == Microsoft.SharePoint.WebControls.SPControlMode.New)
            {
                SPContext.Current.ListItem[ParentField] = ParentID;
                SPContext.Current.ListItem.Update();
            }
        }
    }
}
