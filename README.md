# ShiftList

I recently got hired at a hospital that doesn't use Epic. Shocking, I know. Epic does a decent job of laying out the tasks a nurse needs to do throughout their shift. The EMR at my new hospital has no such function, so I made one.

## Description

Welcome to ShiftList! A todo list app made specifically for nurses with multiple patients.

![Screenshot 2024-09-02 at 9 05 35 PM](https://github.com/user-attachments/assets/150bbe56-5a8b-4114-9261-204e8d07fd17)

The application is designed with React and uses Redux for state management. For backend we have an express rest API that connects to a MongoDB database -- allowing users to create accounts and store as many shifts (lists) as they want.

The initial shiftlist looks pretty standard --

![Screenshot 2024-09-02 at 9 06 41 PM](https://github.com/user-attachments/assets/161658a4-227d-45b8-aedd-1d0ba6a09273)

A timer starts every time you stop typing. If you go 5 seconds without additional updates, the current shift is updated on the backend.

The thing that sets this application apart from a basic todo list is the option to create tabs. The idea is that a single list represents a night of tasks, but nurses can have anywhere from 1 to 8 patients (hopefully that's the max).

![Screenshot 2024-09-02 at 9 06 59 PM](https://github.com/user-attachments/assets/04a9aa9f-62bb-486b-ae64-835cd05b71c7)

Using the rename button you can change the tabs from sequential numbers to patient initials or room numbers to make it easier to tell them apart. Make sure you stay HIPAA compliant! This is not the place to put exact patient identifiers.

![Screenshot 2024-09-02 at 9 07 30 PM](https://github.com/user-attachments/assets/b6db1179-2952-4fd1-b1f5-5eba98aaa7a1)

After you're set up, you can use all the tabs as you would a normal todo list.

 ![Screenshot 2024-09-02 at 9 10 29 PM](https://github.com/user-attachments/assets/9ef59df8-aa7e-4b8f-98ef-27f9457bfe5a)

There is a side tab in which you can find your past shiftlists as well as create a bank of common tasks that you can add to either a single tab or all tabs at once!


![Screenshot 2024-09-02 at 9 11 48 PM](https://github.com/user-attachments/assets/4a7e8056-1645-4453-9156-5c84286886bc)
