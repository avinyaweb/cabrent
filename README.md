<!-- GETTING STARTED -->

## Getting Started

To run the project locally follow the instructions given below.

### Install

```sh
npm install
```

### Run

```sh
npm run dev
```

### Build

```sh
npx vite build
```

## Code Structure

`src` folder: Contains the source code of the project

-   **assets:** Store static assets like images, fonts, etc.
-   **components:** Reusable UI components.
-   **pages:** Individual pages or views of the application.
-   **services:** Backend services or utilities.
-   **hooks:** React hooks codes
-   **utils:** `AuthHOC` code which handles `roles` and `userRolesandPermissions`.

## Pages Structure

This module provides functionalities for creating, editing, and viewing <Module> data. Each module consists of four main code pages, as outlined below.

#### 1. Create `<Module>`

    - This page is used to create a new module with input fields.
    - Users can input relevant data to create a new module.

#### 2. Edit `<Module>`

    - This page allows users to edit an existing module.
    - Input fields are pre-populated with existing data for easy modification.

#### 3. View `<Module>`

    - This page displays module details in a table/list manner.
    - Users can view all modules and their associated data.

#### 4. View Specific `<Module>`

    - This page enables users to view a specific module without edit access.
    - Input fields are populated with data for reference.

#### 5. `<Module>` Layout

    - The layout for the `<Module>` is consistent across all pages for a cohesive user experience.
    - Input fields and field components are reused in the Create, Edit, and View Specific pages.

## Module Structure

#### 1. `Dashboard`

    - index.tsx

#### 2. `Admin`

    - Roles
    - Admin
    - Admin Teams
    - Admin Tickets
    - Channel Partner
    - Channel Partner API
    - Channel Partner API Config

#### 3. `Business Profile`

    - Driver
    - Travel Agency
    - Vehicle

#### 4. `Subscription`

    - Subscription
    - Subscription Amount Distribution
    - Subscription History
    - Subscription Invoice

#### 5. `Transaction`

    - Money Request
    - Wallet Master
    - Wallet History
    - Bank Account
    - PG Transactions
    - Application Offered Money
    - Application Offered Money History

#### 6. `Promotion`

    - Bonus Master
    - Bonus History
    - Coupon Master
    - Coupon History
    - Refferal Master
    - Refferal History
    - Promocode Master
    - Promocode History

#### 7. `Trips`

    - Vehicle Types
    - Vehicle Fare Master
    - Bookings
    - Trips
    - Booking Amount Distribution
    - Tickets
    - Trips Invoice

#### 8. `Settings`

    - Settings Panel

#### 9. `Utility`

    - Country
    - State
    - City
    - Status
    - Service City
    - Ticket Type
    - Admin Role
    - Module Master
    - Document Type
    - Channel Partner Type
    - Employee Level
    - Company Type
    - Vehicle Utility

#### 10. `Auth`

    - Breadcrumb
    - Login

## Every End of the day and beggining of the day

Get all the latest code by using the following command

```sh
git pull --all
```

Merge development into your local branch and resolve if any conflicts occured

```sh
git merge origin/development
```

Once the conflicts are resolved you can use the following command to complete the merge

```sh
git add .
```

```sh
git merge origin/development
```

Once this is done push the code to remote

```sh
git push
```
