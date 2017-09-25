var TYPES = require('tedious').TYPES;
module.exports = function (type) {
    switch(type) {
        case "char": 
            return TYPES.Char;
            break;
        case "varchar": 
            return TYPES.VarChar;
            break;
        case "text": 
            return TYPES.Text;
            break;
        case "bit": 
            return TYPES.Bit;
            break;
        case "tinyint": 
            return TYPES.TinyInt;
            break;
        case "smallint": 
            return TYPES.SmallInt;
            break;
        case "int": 
            return TYPES.Int;
            break;
        case "bigint": 
            return TYPES.BigInt;
            break;
        case "numeric": 
            return TYPES.Numeric;
            break;
        case "decimal": 
            return TYPES.Decimal;
            break;
        case "smallmoney": 
            return TYPES.SmallMoney;
            break;
        case "money": 
            return TYPES.Money;
            break;
        case "float": 
            return TYPES.Float;
            break;
        case "real": 
            return TYPES.Real;
            break;
        case "smalldatetime": 
            return TYPES.SmallDateTime;
            break;
        case "datetime": 
            return TYPES.DateTime;
            break;
        case "datetime2": 
            return TYPES.DateTime2;
            break;
        case "datetimeoffset": 
            return TYPES.DateTimeOffset;
            break;
        case "time": 
            return TYPES.Time;
            break;
        case "date": 
            return TYPES.Date;
            break;
        case "binary": 
            return TYPES.Binary;
            break;
        case "varbinary": 
            return TYPES.VarBinary;
            break;
        case "image": 
            return TYPES.Image;
            break;
        case "null": 
            return TYPES.Null;
            break;
        default:
            return TYPES.Null;
            break;
    }
}