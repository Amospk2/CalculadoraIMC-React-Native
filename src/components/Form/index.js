import React,{useState} from 'react';
import {View, 
        Text, 
        TextInput, 
        TouchableOpacity,
        Vibration,
        Pressable,
        Keyboard,
        FlatList,
} from 'react-native';
import ResultIMC from './ResultIMC';
import styles from './style';

export default function Form(){

    const [altura, setAltura] = useState('');
    const [peso, setPeso] = useState('');
    const [messageIMC, setmessageIMC] = useState("Preencha o peso e altura");
    const [imc, setImc] = useState(null);
    const [textbutton, setTextButton] = useState("Calcular");
    const [erroMessage, setErroMessage] = useState(null);   
    const [imcList, setimcList] = useState([])


    function IMCCalculer()
    {
        let alturaFormat = altura.replace(",", ".")
        let totalIMC = ((peso/(alturaFormat*alturaFormat)).toFixed(2));
        setimcList ((arr)=>[...arr,{id:new Date().getTime(), imc:totalIMC}]);
        setImc(totalIMC);
    }

    function verificationIMC()
    {
        if(imc == null)
        {
            setErroMessage("Campo obrigatorio*")
            Vibration.vibrate();
        }
    }


    function validationIMC()
    {
        if(peso != '' && altura != '')
        {
            IMCCalculer()
            setPeso('')
            setAltura('')
            setmessageIMC("seu imc é igual:")
            setTextButton("Calcular novamente")
            setErroMessage(null)
        }
        else
        {
            verificationIMC()
            setImc(null)
            setTextButton("Calcular")
            setmessageIMC("Preencha o peso e altura")
        }
        
    }

    return (
        <View style={styles.formContext}> 
        {imc == null ?
        <Pressable onPress={Keyboard.dismiss} style={styles.form}>
                <Text style={styles.formLabel}>Altura</Text>
                <Text style={styles.errorMessage}>{erroMessage}</Text>
                <TextInput 
                onChangeText={setAltura}
                value={altura}
                placeholder="Ex: 1.77"
                keyboardType="numeric"
                style = {styles.input}
                />

                <Text style={styles.formLabel}>Peso</Text>
                <Text style={styles.errorMessage}>{erroMessage}</Text>
                <TextInput
                onChangeText={setPeso}
                value = {peso}
                placeholder="Ex: 64.5"
                keyboardType="numeric"
                style = {styles.input}
                />

                <TouchableOpacity
                style={styles.buttonCalculator}
                onPress={()=>{validationIMC()}}
                ><Text style={styles.textbuttonCalculator}>{textbutton}</Text></TouchableOpacity>
            
            </Pressable>
            :
            <View style={styles.exibirResult}>
                <TouchableOpacity
                style={styles.buttonCalculator}
                onPress={()=>{validationIMC()}}
                ><Text style={styles.textbuttonCalculator}>{textbutton}</Text></TouchableOpacity>
                <ResultIMC messageResultIMC={messageIMC} ResultIMC={imc} />
            
            </View>
            }
            <FlatList
            style={styles.listImcs}
            data={imcList.reverse()}
            renderItem={({item}) =>{
                return(
                    <Text style={styles.resultImcItem}>
                        <Text style={styles.resultImcItemList}>Resultado IMC:</Text>
                        {item.imc}
                    </Text>
                
                    
                )
            }}
            keyExtractor={(item)=>{item.id}}
            >

            </FlatList>
            
        </View>
    );
}
