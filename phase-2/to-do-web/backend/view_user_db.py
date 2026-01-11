import sqlite3 
conn = sqlite3.connect('test.db') 
cursor = conn.cursor() 
 
# Show user table structure 
cursor.execute("PRAGMA table_info(user);") 
columns = cursor.fetchall() 
print('User table structure:') 
for col in columns: 
    print(col) 
 
# Show all users 
cursor.execute('SELECT * FROM user;') 
users = cursor.fetchall() 
print('\\nUsers in database:') 
for user in users: 
    print(user) 
 
# Show all tasks 
cursor.execute('SELECT * FROM task;') 
tasks = cursor.fetchall() 
print('\\nTasks in database:') 
for task in tasks: 
    print(task) 
 
conn.close() 
