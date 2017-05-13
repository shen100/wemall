package utils

import (
	"fmt"
	"reflect"
	"errors"
)

func setField(obj interface{}, name string, value interface{}) error {
	structData := reflect.ValueOf(obj).Elem()
    fieldValue := structData.FieldByName(name)

    if !fieldValue.IsValid() {
        return fmt.Errorf("No such field: %s in obj ", name)
    }

    if !fieldValue.CanSet() {
        return fmt.Errorf("Cannot set %s field value ", name)
    }

   	fieldType := fieldValue.Type()
    val       := reflect.ValueOf(value)

	valTypeStr   := val.Type().String()
	fieldTypeStr := fieldType.String()
	if valTypeStr == "float64" && fieldTypeStr == "int" {
		val = val.Convert(fieldType)
	} else if fieldType != val.Type() {
        return errors.New("Provided value type " + valTypeStr + " didn't match obj field type " + fieldTypeStr)
    }
    fieldValue.Set(val)
    return nil
}

// SetStructByJSON 由json对象生成 struct
func SetStructByJSON(obj interface{}, mapData map[string]interface{}) error {
	for key, value := range mapData {
        if err := setField(obj, key, value); err != nil {
			fmt.Println(err.Error())
            return err
        }
    }
	return nil
}

// StrToIntMonth 字符串月份转整数月份
func StrToIntMonth(month string) int  {
    fmt.Println(month)
    var data = map[string]int{
        "May": 4,
    };
    return data[month];
}

 func SubString(str string, begin, length int) (substr string) {  
    // 将字符串的转换成[]rune  
    rs  := []rune(str)  
    len := len(rs)
        
    // 简单的越界判断  
    if begin < 0 {  
        begin = 0  
    }  
    if begin >= len {  
        begin = len  
    }  
    end := begin + length  
    if end > len {  
        end = len   
    }
      
    // 返回子串  
    return string(rs[begin:end])  
} 