
export interface QuestionOptions {
    value?: any;
    valueType?: string;
    key?: string,
    label?: string,
    description?: string,
    required?: boolean,
    nullable?: boolean,
    allowSave?: boolean,
    readOnly?: boolean,
    min?: number | string,
    max?: number | string,
    pattern?: string,
    options?: Array<any>,
    optionTranslations?: {[prop: string]: string},
    nullValue?: any,
    isArray?: boolean,
    order?: number,
    controlType?: string;
}

export class QuestionBase<T>{
    value: T;
    valueType: string;
    key: string;
    label: string;
    description: string;
    required: boolean;
    nullable: boolean;
    allowSave: boolean;
    readOnly: boolean;
    min: number | string | undefined;
    max: number | string | undefined;
    pattern: string | undefined;
    options: Array<T> | undefined;
    optionTranslations: {[prop: string]: string} | undefined;
    nullValue: T | undefined;
    isArray: boolean;
    order: number;
    controlType: string;
    nestedQuestions?: QuestionBase<any>[];

    constructor(options: QuestionOptions = {}) {
        this.value = (options.value as T);
        this.valueType = options.valueType || 'any';
        this.key = options.key || '';
        this.label = options.label || '';
        this.description = options.description || '';
        this.required = !!options.required;
        this.nullable = !!options.nullable;
        this.allowSave = !!options.allowSave;
        this.readOnly = !!options.readOnly;
        this.min = options.min;
        this.max = options.max;
        this.nullValue = options.nullValue;
        this.isArray = options.isArray == undefined ? false : true;
        this.order = options.order === undefined ? 1 : options.order;
        this.controlType = options.controlType || '';
    }
}
