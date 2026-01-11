import sqlite3 
conn = sqlite3.connect('test.db') 
cursor = conn.cursor() 
 
# Show all tables 
cursor.execute("SELECT name FROM sqlite_master WHERE type='table';") 
tables = cursor.fetchall() 
print('Tables in database:', tables) 
 
# Show users if it exists 
if ('users',) in tables: 
    cursor.execute('SELECT * FROM users;') 
    users = cursor.fetchall() 
    print('\\nUsers in database:') 
    for user in users: 
        print(user) 
else: 
    print('\\nNo users table found') 
 
conn.close() 
