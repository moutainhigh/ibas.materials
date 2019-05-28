/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace ui {
        export namespace c {
            /** 编辑视图-规格模板 */
            export class SpecificationEditView extends ibas.BOEditView implements app.ISpecificationEditView {
                /** 删除数据事件 */
                deleteDataEvent: Function;
                /** 新建数据事件，参数1：是否克隆 */
                createDataEvent: Function;
                /** 添加规格模板-项目事件 */
                addSpecificationItemEvent: Function;
                /** 删除规格模板-项目事件 */
                removeSpecificationItemEvent: Function;
                /** 选择规格模板目标事件 */
                chooseSpecificationTargetEvent: Function;
                /** 添加规格模板-项目值事件 */
                addSpecificationItemValueEvent: Function;
                /** 删除规格模板-项目值事件 */
                removeSpecificationItemValueEvent: Function;
                /** 编辑规格模事件 */
                editSpecificationItemEvent: Function;

                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    let formTop: sap.ui.layout.form.SimpleForm = new sap.ui.layout.form.SimpleForm("", {
                        editable: true,
                        content: [
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("materials_title_general") }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_specification_target") }),
                            new sap.m.FlexBox("", {
                                items: [
                                    new sap.extension.m.RepositoryInput("", {
                                        showValueHelp: true,
                                        width: "100%",
                                        layoutData: new sap.m.FlexItemData("", {
                                            growFactor: 1,
                                        }),
                                        repository: materials.bo.BORepositoryMaterials,
                                        dataInfo: {
                                            type: materials.bo.Material,
                                            key: "Code",
                                            text: "Name"
                                        },
                                        valueHelpRequest: function (): void {
                                            that.fireViewEvents(that.chooseSpecificationTargetEvent);
                                        }
                                    }).bindProperty("visible", {
                                        path: "targetType",
                                        formatter(data: any): any {
                                            if (data === bo.emSpecificationTarget.MATERIAL) {
                                                return true;
                                            } else if (data === bo.emSpecificationTarget.MATERIAL_GROUP) {
                                                return false;
                                            }
                                            return false;
                                        }
                                    }).bindProperty("bindingValue", {
                                        path: "target",
                                        type: new sap.extension.data.Alphanumeric({
                                            maxLength: 20
                                        })
                                    }),
                                    new sap.extension.m.RepositoryInput("", {
                                        showValueHelp: true,
                                        width: "100%",
                                        layoutData: new sap.m.FlexItemData("", {
                                            growFactor: 1,
                                        }),
                                        repository: materials.bo.BORepositoryMaterials,
                                        dataInfo: {
                                            type: materials.bo.MaterialGroup,
                                            key: "Code",
                                            text: "Name"
                                        },
                                        valueHelpRequest: function (): void {
                                            that.fireViewEvents(that.chooseSpecificationTargetEvent);
                                        }
                                    }).bindProperty("visible", {
                                        path: "targetType",
                                        formatter(data: any): any {
                                            if (data === bo.emSpecificationTarget.MATERIAL) {
                                                return false;
                                            } else if (data === bo.emSpecificationTarget.MATERIAL_GROUP) {
                                                return true;
                                            }
                                            return false;
                                        }
                                    }).bindProperty("bindingValue", {
                                        path: "target",
                                        type: new sap.extension.data.Alphanumeric({
                                            maxLength: 20
                                        })
                                    }),
                                ]
                            }),
                            new sap.extension.m.EnumSelect("", {
                                enumType: bo.emSpecificationTarget
                            }).bindProperty("bindingValue", {
                                path: "targetType",
                                type: new sap.extension.data.Enum({
                                    enumType: bo.emSpecificationTarget
                                })
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_specification_name") }),
                            new sap.extension.m.Input("", {
                            }).bindProperty("bindingValue", {
                                path: "name",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 100
                                })
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_specification_activated") }),
                            new sap.extension.m.EnumSelect("", {
                                enumType: ibas.emYesNo
                            }).bindProperty("bindingValue", {
                                path: "activated",
                                type: new sap.extension.data.YesNo()
                            }),
                            new sap.ui.core.Title("", {}),
                        ]
                    });
                    this.tableSpecificationItem = new sap.extension.table.DataTable("", {
                        enableSelectAll: false,
                        visibleRowCount: sap.extension.table.visibleRowCount(8),
                        dataInfo: {
                            code: bo.Specification.BUSINESS_OBJECT_CODE,
                            name: bo.SpecificationItem.name
                        },
                        toolbar: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_add"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://add",
                                    press: function (): void {
                                        that.fireViewEvents(that.addSpecificationItemEvent, that.tableSpecificationItem.getSelecteds().firstOrDefault());
                                    }
                                }),
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_remove"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://less",
                                    press: function (): void {
                                        that.fireViewEvents(that.removeSpecificationItemEvent, that.tableSpecificationItem.getSelecteds());
                                    }
                                })
                            ]
                        }),
                        rows: "{/rows}",
                        rowActionCount: 1,
                        rowActionTemplate: new sap.ui.table.RowAction("", {
                            items: [
                                new sap.ui.table.RowActionItem("", {
                                    icon: "sap-icon://slim-arrow-right",
                                    press: function (oEvent: any): void {
                                        that.fireViewEvents(that.editSpecificationItemEvent
                                            , this.getBindingContext().getObject()
                                        );
                                    },
                                }),
                            ]
                        }),
                        columns: [
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_specificationitem_lineid"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "lineId",
                                    type: new sap.extension.data.Numeric()
                                }),
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_specificationitem_parentsign"),
                                template: new sap.extension.m.Input("", {
                                }).bindProperty("bindingValue", {
                                    path: "parentSign",
                                    type: new sap.extension.data.Alphanumeric({
                                        maxLength: 8
                                    })
                                }),
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_specificationitem_sign"),
                                template: new sap.extension.m.Input("", {
                                }).bindProperty("bindingValue", {
                                    path: "sign",
                                    type: new sap.extension.data.Alphanumeric({
                                        maxLength: 8
                                    })
                                }),
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_specificationitem_description"),
                                template: new sap.extension.m.Input("", {
                                }).bindProperty("bindingValue", {
                                    path: "description",
                                    type: new sap.extension.data.Alphanumeric({
                                        maxLength: 100
                                    })
                                }),
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_specificationitem_editable"),
                                template: new sap.extension.m.CheckBox("", {
                                }).bindProperty("bindingValue", {
                                    path: "editable",
                                    type: new sap.extension.data.YesNo()
                                }),
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_specificationitem_content"),
                                template: new sap.extension.m.Input("", {
                                }).bindProperty("bindingValue", {
                                    path: "content",
                                    type: new sap.extension.data.Alphanumeric({
                                        maxLength: 60
                                    })
                                }),
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_specificationitem_note"),
                                template: new sap.extension.m.Input("", {
                                }).bindProperty("bindingValue", {
                                    path: "note",
                                    type: new sap.extension.data.Alphanumeric({
                                        maxLength: 200
                                    })
                                }),
                            }),
                        ]
                    });
                    this.tableSpecificationItemValue = new sap.extension.table.DataTable("", {
                        enableSelectAll: false,
                        visibleRowCount: sap.extension.table.visibleRowCount(8),
                        dataInfo: {
                            code: bo.Specification.BUSINESS_OBJECT_CODE,
                            name: bo.SpecificationItemValue.name
                        },
                        toolbar: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_add"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://add",
                                    press: function (): void {
                                        that.fireViewEvents(that.addSpecificationItemValueEvent);
                                    }
                                }),
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_remove"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://less",
                                    press: function (): void {
                                        that.fireViewEvents(that.removeSpecificationItemValueEvent, that.tableSpecificationItemValue.getSelecteds());
                                    }
                                }),
                                new sap.m.ToolbarSpacer(""),
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_back"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://nav-back",
                                    press: function (): void {
                                        that.fireViewEvents(that.editSpecificationItemEvent);
                                    }
                                })
                            ]
                        }),
                        rows: "{/rows}",
                        columns: [
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_specificationitemvalue_value"),
                                template: new sap.extension.m.Input("", {
                                }).bindProperty("bindingValue", {
                                    path: "value",
                                    type: new sap.extension.data.Alphanumeric({
                                        maxLength: 30
                                    })
                                })
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_specificationitemvalue_description"),
                                template: new sap.extension.m.Input("", {
                                }).bindProperty("bindingValue", {
                                    path: "description",
                                    type: new sap.extension.data.Alphanumeric({
                                        maxLength: 100
                                    })
                                })
                            }),
                        ]
                    });
                    let formMiddle: sap.ui.layout.form.SimpleForm = new sap.ui.layout.form.SimpleForm("", {
                        editable: true,
                        content: [
                            this.tableTitle = new sap.ui.core.Title("", { text: ibas.i18n.prop("bo_specificationitem") }),
                            this.splitContainer = new sap.m.SplitContainer("", {
                                mode: sap.m.SplitAppMode.HideMode,
                                detailPages: [
                                    this.tableSpecificationItem,
                                    this.tableSpecificationItemValue
                                ]
                            }),
                        ]
                    });
                    let formBottom: sap.ui.layout.form.SimpleForm = new sap.ui.layout.form.SimpleForm("", {
                        editable: true,
                        content: [
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("materials_title_others") }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_specification_remarks") }),
                            new sap.extension.m.TextArea("", {
                                rows: 3,
                            }).bindProperty("bindingValue", {
                                path: "remarks",
                                type: new sap.extension.data.Alphanumeric()
                            }),
                            new sap.ui.core.Title("", {}),
                        ]
                    });
                    return this.page = new sap.extension.m.DataPage("", {
                        showHeader: false,
                        dataInfo: {
                            code: bo.Specification.BUSINESS_OBJECT_CODE,
                        },
                        subHeader: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_save"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://save",
                                    press: function (): void {
                                        that.fireViewEvents(that.saveDataEvent);
                                    }
                                }),
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_delete"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://delete",
                                    press: function (): void {
                                        that.fireViewEvents(that.deleteDataEvent);
                                    }
                                }),
                                new sap.m.ToolbarSeparator(""),
                                new sap.m.MenuButton("", {
                                    text: ibas.strings.format("{0}/{1}",
                                        ibas.i18n.prop("shell_data_new"), ibas.i18n.prop("shell_data_clone")),
                                    icon: "sap-icon://create",
                                    type: sap.m.ButtonType.Transparent,
                                    menu: new sap.m.Menu("", {
                                        items: [
                                            new sap.m.MenuItem("", {
                                                text: ibas.i18n.prop("shell_data_new"),
                                                icon: "sap-icon://create",
                                                press: function (): void {
                                                    // 创建新的对象
                                                    that.fireViewEvents(that.createDataEvent, false);
                                                }
                                            }),
                                            new sap.m.MenuItem("", {
                                                text: ibas.i18n.prop("shell_data_clone"),
                                                icon: "sap-icon://copy",
                                                press: function (): void {
                                                    // 复制当前对象
                                                    that.fireViewEvents(that.createDataEvent, true);
                                                }
                                            }),
                                        ],
                                    })
                                }),
                            ]
                        }),
                        content: [
                            formTop,
                            formMiddle,
                            formBottom,
                        ]
                    });
                }
                private page: sap.extension.m.Page;
                private tableTitle: sap.ui.core.Title;
                private splitContainer: sap.m.SplitContainer;
                private tableSpecificationItem: sap.extension.table.Table;
                private tableSpecificationItemValue: sap.extension.table.Table;

                /** 显示数据 */
                showSpecification(data: bo.Specification): void {
                    this.page.setModel(new sap.extension.model.JSONModel(data));
                    // 改变页面状态
                    sap.extension.pages.changeStatus(this.page);
                }
                /** 显示数据 */
                showSpecificationItems(datas: bo.SpecificationItem[]): void {
                    this.tableTitle.setText(ibas.i18n.prop("bo_specificationitem"));
                    this.splitContainer.backToTopDetail(null, null);
                    this.tableSpecificationItem.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                }
                /** 显示数据 */
                showSpecificationItemValues(datas: bo.SpecificationItemValue[]): void {
                    this.tableTitle.setText(ibas.i18n.prop("bo_specificationitemvalue"));
                    this.splitContainer.toDetail(this.tableSpecificationItemValue.getId(), null, null, null);
                    this.tableSpecificationItemValue.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                }
            }
        }
    }
}