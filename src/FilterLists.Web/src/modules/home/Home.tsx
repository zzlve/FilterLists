import * as React from "react";
import { ListsTable, Oneliner } from "./components";
import { IColumnVisibility } from "./interfaces/IColumnVisibility";
import { ILicense } from "./interfaces/ILicense";
import { IList } from "./interfaces/IList";
import { IMaintainer } from "./interfaces/IMaintainer";
import { ISoftware } from "./interfaces/ISoftware";
import { ISyntax } from "./interfaces/ISyntax";
import { ITag } from "./interfaces/ITag";
import { Language } from "./interfaces/Language";

const columnVisibilityDefaults: IColumnVisibility[] = [
    { column: "Software", visible: true },
    { column: "Languages", visible: true },
    { column: "Tags", visible: true },
    { column: "License", visible: false },
    { column: "Maintainers", visible: false },
    { column: "Subscribe", visible: false }
];

interface Props {
    languages: Language[];
    licenses: ILicense[];
    lists: IList[];
    maintainers: IMaintainer[];
    software: ISoftware[];
    syntaxes: ISyntax[];
    tags: ITag[];
};

interface IState {
    columnVisibility: IColumnVisibility[];
    pageSize: number;
};

export class Home extends React.Component<Props, IState> {
    constructor(props: Props) {
        super(props);
        this.state = {
            columnVisibility: columnVisibilityDefaults,
            pageSize: 20
        };
        this.updatePageSize = this.updatePageSize.bind(this);
    }

    componentDidMount() {
        this.setMobileColumnVisibility();
        this.updatePageSize();
    };

    setMobileColumnVisibility() {
        if (window.innerWidth < 768) {
            this.state.columnVisibility.forEach((c: IColumnVisibility) => {
                c.visible = false;
            });
        }
    };

    updatePageSize() {
        this.setState({
            pageSize: Math.max(Math.floor((window.innerHeight - 340) / 55), 5)
        });
    };

    render() {
        return <div>
            <Oneliner listCount={this.props.lists.length} />
            <ListsTable {...this.props} {...this.state} />
            {this.renderColumnVisibilityCheckboxes()}
        </div>;
    };

    renderColumnVisibilityCheckboxes() {
        return this.props.lists.length > 0
            ? <div className="d-none d-md-block text-right">
                Visible:&nbsp;&nbsp;{this.state.columnVisibility.map(
                    (c: IColumnVisibility, i: number) => this.renderColumnVisibilityCheckbox(c, i))}
            </div>
            : null;
    };

    renderColumnVisibilityCheckbox(props: IColumnVisibility, key: number) {
        return <div className="form-check form-check-inline" key={key}>
            <input className="form-check-input"
                type="checkbox"
                id={`checkbox${props.column.replace(/\s+/g, "")}`}
                defaultChecked={props.visible}
                onChange={() => this.checkColumn(props)} />
            <label className="form-check-label"
                htmlFor={`checkbox${props.column.replace(/\s+/g, "")}`}>
                {props.column}
            </label>
        </div>;
    };

    checkColumn(props: IColumnVisibility) {
        const columnVisibility = this.state.columnVisibility;
        const index = this.findWithAttr(columnVisibility, "column", props.column);
        columnVisibility[index].visible = !columnVisibility[index].visible;
        this.forceUpdate();
    };

    findWithAttr(array: any, attr: string, value: string) {
        for (let i = 0; i < array.length; i += 1) {
            if (array[i][attr] === value) {
                return i;
            }
        }
        return -1;
    };
};