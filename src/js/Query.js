// logical operators
export const LOG_OPS = [
    'and',
    'or'
];

// relational operators
export const REL_OPS = [
    '=',
    '!=',
    '>',
    '<',
    '>=',
    '<=',
    'in',
    'not in',
    'like',
    'not like'
];

export const SORT_TYPES = [
    'asc',
    'desc'
];

export class QueryFn {

    constructor(fnName, ...args) {
        this.fnName = fnName;
        this.args = args;
    }

}

export class QueryConst {

    constructor(constName) {
        this.constName = constName;
    }

}

function isNull(n) {
    return n === null || n === undefined;
}

function isString(n) {
    return typeof n === 'string';
}

function isNumber(n) {
    return typeof n === 'number';
}

function isArray(n) {
    return Array.isArray(n);
}

// function isObject(n) {
//     return typeof n === 'object';
// }

function isQueryFn(n) {
    return n instanceof QueryFn;
}

function isQueryConst(n) {
    return n instanceof QueryConst;
}

function stringify(n) {

    if (isNull(n)) {
        return '""';
    } else if (isArray(n)) {
        return `(${n.map((n) => stringify(n)).join(', ')})`;
    } else if (isString(n)) {
        return `"${n}"`;
    } else if (isNumber(n)) {
        return `${n}`;
    } else if (isQueryConst(n)) {
        return n.constName;
    } else if (isQueryFn(n)) {
        return `${n.fnName}${stringify(n.args)}`;
    }

    return '""';

}

export class Query {

    constructor(logOp = 'and') {

        if (LOG_OPS.indexOf(logOp) === -1) {
            throw new Error(`${logOp} is invalid logical operator`);
        }

        this.data = {
            logOp,
            params: [],
            orders: [],
            limit: null,
            offset: null
        };

        return this;

    }

    join(query) {
        this.data.params.push({ type: 'query', query });
        return this;
    }

    param(field, relOp, value) {

        if (REL_OPS.indexOf(relOp) === -1) {
            throw new Error(`${relOp} is invalid relational operator`);
        }

        this.data.params.push({ type: 'param', field, relOp, value });
        return this;
    }

    orderBy(field, sortType = 'asc') {

        if (SORT_TYPES.indexOf(sortType) === -1) {
            throw new Error(`${sortType} is invalid sort type`);
        }

        this.data.orders.push({ field, sortType });
        return this;
    }

    limit(limit) {

        if (!isNull(limit) && isNaN(Number(limit))) {
            throw new Error('limit must be a number');
        }

        this.data.limit = isNull(limit) ? null : Number(limit);
        return this;

    }

    offset(offset) {

        if (!isNull(offset) && isNaN(Number(offset))) {
            throw new Error('offset must be a number');
        }

        this.data.offset = isNull(offset) ? null : Number(offset);
        return this;

    }

    queryCondition() {

        let { logOp, params } = this.data;

        return params.map(({ type, query, field, relOp, value }) => {
            switch (type) {
                case 'query':
                    return `(${query.queryCondition()})`;
                case 'param':
                    return `${field} ${relOp} ${stringify(value)}`;
            }
        }).join(` ${logOp} `);

    }

    query() {

        let queryCondition = this.queryCondition();

        let { orders, limit, offset } = this.data;

        let orderStr = orders.length === 0 ? ''
            : 'order by ' + orders.map(({ field, sortType }) => `${field} ${sortType}`).join(', ');
        let limitStr = isNull(limit) ? '' : `limit ${limit}`;
        let offsetStr = isNull(offset) ? '' : `offset ${offset}`;

        return [queryCondition, orderStr, limitStr, offsetStr].filter((n) => n).join(' ');

    }

    static fn(fnName, ...args) {
        return new QueryFn(fnName, ...args);
    }

    static const(constName) {
        return new QueryConst(constName);
    }

}
