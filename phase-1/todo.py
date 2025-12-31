def display_menu():
    print("\nTodo App Menu")
    print("1. Add Task")
    print("2. View Tasks")
    print("3. Update Task")
    print("4. Delete Task")
    print("5. Toggle Task Completion")
    print("6. Exit")


def add_task(tasks, next_id):
    title = input("Enter task title: ").strip()
    if not title:
        print("Error: Task title cannot be empty.")
        return next_id
    task = {"id": next_id, "title": title, "completed": False}
    tasks.append(task)
    print(f"Task added with ID {next_id}.")
    return next_id + 1


def view_tasks(tasks):
    if not tasks:
        print("No tasks available.")
        return
    print("\nTasks:")
    for task in tasks:
        status = "Completed" if task["completed"] else "Incomplete"
        print(f'ID: {task["id"]} | Title: {task["title"]} | Status: {status}')


def find_task(tasks, task_id):
    for task in tasks:
        if task["id"] == task_id:
            return task
    return None


def update_task(tasks):
    try:
        task_id = int(input("Enter task ID to update: "))
    except ValueError:
        print("Error: Invalid ID.")
        return

    task = find_task(tasks, task_id)
    if not task:
        print("Error: Task not found.")
        return

    new_title = input("Enter new task title: ").strip()
    if not new_title:
        print("Error: Task title cannot be empty.")
        return

    task["title"] = new_title
    print("Task updated successfully.")


def delete_task(tasks):
    try:
        task_id = int(input("Enter task ID to delete: "))
    except ValueError:
        print("Error: Invalid ID.")
        return

    task = find_task(tasks, task_id)
    if not task:
        print("Error: Task not found.")
        return

    tasks.remove(task)
    print("Task deleted successfully.")


def toggle_task_completion(tasks):
    try:
        task_id = int(input("Enter task ID to toggle completion: "))
    except ValueError:
        print("Error: Invalid ID.")
        return

    task = find_task(tasks, task_id)
    if not task:
        print("Error: Task not found.")
        return

    task["completed"] = not task["completed"]
    status = "completed" if task["completed"] else "incomplete"
    print(f"Task marked as {status}.")


def main():
    tasks = []
    next_id = 1

    while True:
        display_menu()
        choice = input("Select an option: ").strip()

        if choice == "1":
            next_id = add_task(tasks, next_id)
        elif choice == "2":
            view_tasks(tasks)
        elif choice == "3":
            update_task(tasks)
        elif choice == "4":
            delete_task(tasks)
        elif choice == "5":
            toggle_task_completion(tasks)
        elif choice == "6":
            print("Exiting Todo App.")
            break
        else:
            print("Invalid choice. Please select a valid option.")


if __name__ == "__main__":
    main()
