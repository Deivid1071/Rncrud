import React, { useContext } from 'react'
import { Alert } from 'react-native'
import { View, Text, FlatList } from 'react-native'
import { ListItem, Avatar, Icon, Button } from 'react-native-elements'
import UsersContext from '../context/UsersContext'


export default props => {

   const { state } = useContext(UsersContext)

    function confirmUserDeletion(user){
        Alert.alert('Excluir usuário', 'Deseja excluir usuário', [
            {
                text: 'Sim',
                onPress(){
                    console.warn('deletando...' + user.id)
                }
            },
            {
                text:'Não'
            },
        ])
    }
    
    function getuserItem({ item: user }) {
        return (
            <ListItem 
                key={user.id} 
                bottomDivider                 
            >
            <Avatar source={{uri: user.avatarUrl}} />
            <ListItem.Content>
              <ListItem.Title>{user.name}</ListItem.Title>
              <ListItem.Subtitle>{user.email}</ListItem.Subtitle>              
            </ListItem.Content>
            <Icon  name='edit' size={25} color= 'orange' onPress={()=> props.navigation.navigate('UserForm', user)}/>
            <Icon  name='delete' size={25} color= 'red' onPress={()=> confirmUserDeletion(user)}/>           
          </ListItem>
        )
    }

    return (
        <View>
            <FlatList
            keyExtractor = {users => users.id.toString()}
                data={state.users}
                renderItem={getuserItem}
            />
        </View>
    )
}