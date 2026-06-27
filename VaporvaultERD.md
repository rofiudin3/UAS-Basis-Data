# VaporVault - Database Schema & ERD Document

## Entities & Relationships

1. **Users**
   - Stores account information and wallet balance.
   - One User can have many Transactions.
   - One User can have many Games in their Library.

2. **Categories**
   - Defines game genres (e.g., RPG, Action, Indie).
   - One Category can contain many Games.

3. **Games**
   - Stores game details and pricing.
   - Belongs to a Category.
   - Can be part of many Users' Libraries.

4. **Transactions**
   - Records purchases.
   - Links a User to the purchase event.
   - *Note: In a full system, a TransactionItems table would link Games to Transactions, but per the current Issue requirement, we focus on the primary transaction log.*

5. **Library (Junction Table)**
   - Connects Users and Games.
   - Tracks individual game stats like `playtime_hours` and `installation_status`.

## Folder Structure (Database)
- `database/migrations/`: Definitions for table structures.
- `database/seeders/`: Initial dummy data.
