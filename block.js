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

  function ArrayControl(title, description, source, props, columns = ["key", "value"], elements = undefined) {
    const array = props.attributes[source] || [];
    const adKvItem = () => {
      const newArray = [...array, columns.reduce((acc, column) => ({ ...acc, [column]: "" }), {})];
      props.setAttributes({ [source]: newArray });
    };

    const updateKvItem = (index, column, value) => {
      const newArray = [...array];
      const newItem = { ...newArray[index], [column]: value };
      newArray[index] = newItem;
      props.setAttributes({ [source]: newArray });
    };

    const removeKvItem = (e, index) => {
      const newArray = array.filter((_, i) => i !== index);
      props.setAttributes({ [source]: newArray });
      e.target.blur();
    };

    return el(
      PanelBody,
      {
        title,
      },
      el("p", { className: "description" }, description),
      el("hr"),
      el(
        "div",
        { className: "sds-array" },
        array.map((item, index) =>
          el(
            "div",
            { key: index, className: columns.length > 2 ? "sds-array-grid" : "sds-array-item" },
            columns.map((column, i) =>
              el(TextControl, {
                key: i,
                label: column,
                value: item[column],
                onChange: (value) => updateKvItem(index, column, value),
              })
            ),
            el(
              Button,
              {
                isDestructive: true,
                variant: columns.length > 2 ? "secondary" : "text",
                onClick: (e) => removeKvItem(e, index),
              },
              __("Remove", "text-domain")
            ),
            columns.length > 2 && el("hr")
          )
        ),
        el(
          Button,
          {
            isPrimary: true,
            onClick: adKvItem,
            className: "sds-add-array-item",
          },
          __("Add", "text-domain")
        )
      ),
      elements
    );
  }

  function UrlParamsConfig(props) {
    return ArrayControl(
      __("URL Parameters", "dashboard-editor"),
      __("Add URL parameters to the dashboard", "dashboard-editor"),
      "urlParams",
      props
    );
  }

  function FiltersConfig(props) {
    return ArrayControl(
      __("Filters", "dashboard-editor"),
      __("Add filters to the dashboard", "dashboard-editor"),
      "filters",
      props,
      ["key", "value"],
      el(
        "div",
        {},
        el("hr"),
        el(CheckboxControl, {
          label: __("Visible", "dashboard-editor"),
          help: __("Show the filters in the dashboard", "dashboard-editor"),
          checked: props.attributes.filtersVisible,
          onChange: function (value) {
            props.setAttributes({ filtersVisible: value });
          },
        }),
        el(CheckboxControl, {
          label: __("Expanded", "dashboard-editor"),
          help: __("Expand the filters in the dashboard", "dashboard-editor"),
          checked: props.attributes.filtersExpanded,
          onChange: function (value) {
            props.setAttributes({ filtersExpanded: value });
          },
        }),
        el(TextControl, {
          label: __("Native Filters", "dashboard-editor"),
          help: __("Add native filters to the dashboard", "dashboard-editor"),
          value: props.attributes.filtersNativeFilters,
          onChange: function (value) {
            props.setAttributes({ filtersNativeFilters: value });
          },
        })
      )
    );
  }

  function NativeFiltersConfig(props) {
    return ArrayControl(
      __("Native Filters", "dashboard-editor"),
      __("Add native filters to the dashboard", "dashboard-editor"),
      "nativeFilters",
      props,
      ["id", "column", "operator", "value"]
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
      filters: {
        type: "array",
        default: [],
      },
      filtersVisible: {
        type: "boolean",
      },
      filtersExpanded: {
        type: "boolean",
      },
      filtersNativeFilters: {
        type: "string",
      },
      nativeFilters: {
        type: "array",
        default: [],
      },
    },
    edit: function (props) {
      var dashboardId = props.attributes.dashboardId;
      return [
        el(
          InspectorControls,
          { key: "inspector" },
          BasicConfig(props),
          UrlParamsConfig(props),
          FiltersConfig(props),
          NativeFiltersConfig(props)
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
