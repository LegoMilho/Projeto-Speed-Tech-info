import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 25, 
    backgroundColor: '#e6edec', 
    justifyContent: 'center',
  },
  title: {
    fontSize: 30, 
    fontWeight: 'bold', 
    marginBottom: 60, 
    textAlign: 'center',
  },
  input: {
    borderWidth: 2, 
    borderColor: '#f7cc7c', 
    padding: 10, 
    marginBottom: 12, 
    borderRadius: 10, 
    backgroundColor: '#e2f4f4',
  },
  button: {
    backgroundColor: '#007bff', 
    padding: 10, 
    borderRadius: 5, 
    alignItems: 'center', 
    marginBottom: 12,
  },
  buttonText: {
    color: 'white', 
    fontSize: 16, 
    fontWeight: 'bold',
  },
  clientItem: {
    backgroundColor: '#fff', 
    padding: 12, 
    marginBottom: 10, 
    borderRadius: 5,
  },
  info: {
    fontSize: 16, 
    marginBottom: 4,
  },
});