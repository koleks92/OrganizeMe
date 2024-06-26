# OrganizeMe

OrganizeMe is an ReactNative + MongoDB app to help organize your everyday tasks

![OragnizeMe](screenshot1.png)
![OragnizeMe](screenshot2.png)



## Table of content

-   [Installation](#installation)
-   [Usage](#usage)
-   [License](#license)
-   [Contact](#contact)

## Installation

To use this app you need the OrganizeMeServer ! <br>
https://www.github.com/koleks92/OrganizeMeServer

After OrgranizeMeServer is running, in your terminal:

#### Clone the respository
```
git clone https://github.com/koleks92/OrganizeMe
```

#### Navigate to the project directory
```
cd OrganizeMe
```
#### Edit api addres

Edit services/apis.js to update the URL addresses to match your server's IP address.

#### Start Expo Metro Bundler
```
npx expo start
```

Follow the instructions in the terminal for your platform.

## Usage

Click the three horizontal lines to open the menu:
- Tasks
- History
- About

#### Tasks menu
In the task menu, the user can see incomplete tasks, add new tasks, mark tasks as completed, edit tasks, and view details of specific tasks.

To see tasks in a specific task group, the user has to press the task group name to show or close the tasks.

To see details of a chosen task, the user has to press the task.

To delete a task, the user has to click the 'trash' button at the bottom of the task's details card.

To edit a task, the user should click the edit icon in the top left corner of the task's details card.

To mark a task as completed, the user should press the checkmark button to the right of the task name.

To add a new task, the user should click the plus button in the top right corner of the Tasks Menu.

#### History menu
In the history menu, the user can see all completed tasks.

To see tasks in a specific task group, the user has to press the task group name to show or close the tasks.

To see details of a chosen task, the user has to press the task.

To delete a task, the user has to click the 'trash' button at the bottom of the task's details card.

#### About 

In the about menu, the user can see information about the creator of the app.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Created by Jan Sebastian Konieczek (koleks92).

- [Github](https://github.com/koleks92)
- [Linkedin](https://www.linkedin.com/in/jan-konieczek)
