(function (blocks, editor, components, i18n, element) {
  var el = element.createElement;
  var __ = i18n.__;
  var InspectorControls = editor.InspectorControls;
  var PanelBody = components.PanelBody;
  var TextControl = components.TextControl;
  var CheckboxControl = components.CheckboxControl;
  var Button = components.Button;

  function BasicConfig(props) {
    return el(
      PanelBody,
      { title: __("Dashboard Settings", "dashboard-editor") },
      el(TextControl, {
        label: __("Dashboard ID", "dashboard-editor"),
        help: __("The ID of the dashboard to display", "dashboard-editor"),
        value: props.attributes.dashboardId,
        onChange: function (value) {
          props.setAttributes({ dashboardId: value });
        },
      }),
      el(CheckboxControl, {
        label: __("Autosize", "dashboard-editor"),
        help: __("Resize the dashboard to fit the block (height only)", "dashboard-editor"),
        checked: props.attributes.autosize,
        onChange: function (value) {
          props.setAttributes({ autosize: value });
        },
      }),
      el(CheckboxControl, {
        label: __("Hide Title", "dashboard-editor"),
        help: __("Hide the title of the dashboard", "dashboard-editor"),
        checked: props.attributes.hideTitle,
        onChange: function (value) {
          props.setAttributes({ hideTitle: value });
        },
      }),
      el(CheckboxControl, {
        label: __("Hide Tabs", "dashboard-editor"),
        help: __("Hide the tabs in the dashboard", "dashboard-editor"),
        checked: props.attributes.hideTabs,
        onChange: function (value) {
          props.setAttributes({ hideTabs: value });
        },
      }),
      el(CheckboxControl, {
        label: __("Hide Chart Controls", "dashboard-editor"),
        help: __("Hide the chart controls in the dashboard", "dashboard-editor"),
        checked: props.attributes.hideChartControls,
        onChange: function (value) {
          props.setAttributes({ hideChartControls: value });
        },
      })
    );
  }

  function UrlParameters(props) {
    const urlParams = props.attributes.urlParams || [];
    const addUrlParam = () => {
      const newUrlParams = [...urlParams, { key: "", value: "" }];
      props.setAttributes({ urlParams: newUrlParams });
    };

    const updateUrlParam = (index, key, value) => {
      const newUrlParams = [...urlParams];
      newUrlParams[index] = { key, value };
      props.setAttributes({ urlParams: newUrlParams });
    };

    const removeUrlParam = (e, index) => {
      const newUrlParams = urlParams.filter((_, i) => i !== index);
      props.setAttributes({ urlParams: newUrlParams });
      e.target.blur();
    };
    return el(
      PanelBody,
      {
        title: __("URL Parameters", "dashboard-editor"),
      },
      el(
        "p",
        { className: "description" },
        __(
          "Add URL parameters to the dashboard. These will be passed to the dashboard as query parameters.",
          "dashboard-editor"
        )
      ),
      el("hr"),
      el(
        "div",
        { className: "sds-url-params" },
        urlParams.map((param, index) =>
          el(
            "div",
            { key: index, className: "sds-url-param" },
            el(TextControl, {
              label: __("Key", "text-domain"),
              value: param.key,
              onChange: (value) => updateUrlParam(index, value, param.value),
            }),
            el(
              "div",
              {},
              el(TextControl, {
                label: __("Value", "text-domain"),
                value: param.value,
                onChange: (value) => updateUrlParam(index, param.key, value),
              })
            ),
            el(
              Button,
              {
                isDestructive: true,
                onClick: (e) => removeUrlParam(e, index),
              },
              __("Remove", "text-domain")
            )
          )
        ),
        el(
          Button,
          {
            isPrimary: true,
            onClick: addUrlParam,
            className: "sds-add-url-param",
          },
          __("Add Parameter", "text-domain")
        )
      )
    );
  }

  blocks.registerBlockType("superset-dashboard-sdk/dashboard-block", {
    title: __("Dashboard Block", "dashboard-editor"),
    icon: "chart-bar",
    category: "widgets",
    attributes: {
      dashboardId: {
        type: "string",
        default: "",
      },
      autosize: {
        type: "boolean",
      },
      hideTitle: {
        type: "boolean",
      },
      hideTabs: {
        type: "boolean",
      },
      hideChartControls: {
        type: "boolean",
      },
      urlParams: {
        type: "array",
        default: [],
      },
    },
    edit: function (props) {
      var dashboardId = props.attributes.dashboardId;
      return [
        el(InspectorControls, { key: "inspector" }, BasicConfig(props), UrlParameters(props)),
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
