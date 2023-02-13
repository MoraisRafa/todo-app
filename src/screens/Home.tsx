import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, Keyboard } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Checkbox from 'expo-checkbox';


import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import { useEffect, useState } from "react";
import { Header } from "../components/Header";

export function Home() {

    const [task, setTask] = useState<{ task: string, checked: boolean }[]>([]);
    const [newTask, setNewTask] = useState('');

    async function addTask() {
        if (newTask === '') {

            return;
        }

        const search = task.filter(task => task.task === newTask);

        if (search.length !== 0) {
            Alert.alert('Atenção', 'Já existe uma tarefa com esse nome');
            return;
        }

        setTask([...task, { task: newTask, checked: false }])
        setNewTask('');

        Keyboard.dismiss();
    }

    async function removeTask(item: string) {
        Alert.alert(
            "Apagar tarefa",
            "Tem certeza que deseja apagar essa tarefa?",
            [
                {
                    text: "Não",
                    onPress: () => {
                        return;
                    },
                    style: "cancel"
                },
                {
                    text: "Sim", onPress: () => setTask(task.filter(tasks => tasks.task !== item))
                }
            ],
            { cancelable: false }
        );
    }

    function toggleCheckbox(item: string) {
        const newTaskArray = task.map(task => {
            if (task.task === item) {
                return { task: task.task, checked: !task.checked };
            } else {
                return task;
            }
        });
        setTask(newTaskArray);
    }

    useEffect(() => {
        async function dataLoad() {
            const taskStorage = await AsyncStorage.getItem('task');

            if (taskStorage) {
                setTask(JSON.parse(taskStorage));
            }
        }
        dataLoad();
    }, [])

    useEffect(() => {
        async function dataSave() {
            AsyncStorage.setItem('task', JSON.stringify(task))
        }
        dataSave();
    }, [task])

    return (
        <>
            <View className="flex-1  bg-background pt-20 px-0">
                <Header />

                <View className="flex-1">
                    <FlatList
                        className="flex-1 mt-2"
                        data={task}
                        keyExtractor={item => item.task}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <View className="flex flex-row justify-between items-center bg-zinc-800 mb-2 rounded-md p-3 ml-2">
                                <View className="flex flex-row justify-center items-center">
                                <Checkbox value={item.checked} onValueChange={() => toggleCheckbox(item.task)} color={item.checked ? '#f64c75' :  undefined}/>
                                <Text className={item.checked ? "text-white text-2xl font-bold italic ml-4 line-through" : "text-white text-2xl font-bold ml-4"}>                                    
                                    {item.task}
                                </Text></View>
                                <TouchableOpacity onPress={() => removeTask(item.task)}>
                                    <MaterialCommunityIcons name="delete-forever" size={25} color="#f64c75" />
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                </View>

                <View className="flex flex-row bg-zinc-800 border-b-gray-600 top-1 pt-13 self-stretch justify-center items-center h-24 rounded-xl">
                    <TextInput
                        className="flex-1 h-16 bg-white px-5 ml-4 mb-2 text-xl rounded-xl"
                        placeholder="Adicione uma tarefa"
                        autoCorrect={true}
                        maxLength={25}
                        onChangeText={text => setNewTask(text)}
                        value={newTask}
                    />
                    <TouchableOpacity
                        className="h-14 w-14 m-3 bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full px-3.5 py-3"
                        onPress={() => addTask()}>
                        <Ionicons name="add" size={28} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}