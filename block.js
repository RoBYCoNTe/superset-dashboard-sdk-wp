(function (blocks, editor, components, i18n, element) {
  var el = element.createElement;
  var __ = i18n.__;
  var InspectorControls = editor.InspectorControls;
  var PanelBody = components.PanelBody;
  var TextControl = components.TextControl;

  blocks.registerBlockType("superset-dashboard-sdk/dashboard-block", {
    title: __("Dashboard Block", "dashboard-editor"),
    icon: "chart-bar",
    category: "widgets",
    attributes: {
      dashboardId: {
        type: "string",
        default: "",
      },
      customParameters: {
        type: "string",
        default: "",
      },
    },
    edit: function (props) {
      var dashboardId = props.attributes.dashboardId;
      var customParameters = props.attributes.customParameters;

      return [
        el(
          InspectorControls,
          { key: "inspector" },
          el(
            PanelBody,
            { title: __("Dashboard Settings", "dashboard-editor") },
            el(TextControl, {
              label: __("Dashboard ID", "dashboard-editor"),
              value: dashboardId,
              onChange: function (value) {
                props.setAttributes({ dashboardId: value });
              },
            }),
            el(TextControl, {
              label: __("Custom Parameters (JSON)", "dashboard-editor"),
              value: customParameters,
              onChange: function (value) {
                props.setAttributes({ customParameters: value });
              },
            })
          )
        ),
        el("div", { className: props.className }, el("div", { id: "dashboard-preview" })),
        el("code", null, __("Dashboard ID: ", "dashboard-editor"), dashboardId),
      ];
    },
    save: function (props) {
      var dashboardId = props.attributes.dashboardId;
      var customParameters = props.attributes.customParameters;

      return el(
        "div",
        { className: "sds-dashboard-block" },
        el("div", {
          className: "sds-dashboard-container",
          "data-dashboard-id": dashboardId,
          "data-custom-parameters": customParameters,
        })
      );
    },
  });
})(
  window.wp.blocks,
  window.wp.blockEditor || window.wp.editor,
  window.wp.components,
  window.wp.i18n,
  window.wp.element
);
