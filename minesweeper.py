#!/usr/bin/env python3
"""
Minesweeper Game in Python
A clean terminal-based implementation with full game logic
"""

import random
import os
import sys

class Minesweeper:
    def __init__(self, width=10, height=10, mines=15):
        self.width = width
        self.height = height
        self.mines = mines
        self.board = [[' ' for _ in range(width)] for _ in range(height)]
        self.mine_board = [[0 for _ in range(width)] for _ in range(height)]
        self.revealed = [[False for _ in range(width)] for _ in range(height)]
        self.flagged = [[False for _ in range(width)] for _ in range(height)]
        self.game_over = False
        self.game_won = False
        self.first_move = True
        
    def place_mines(self, exclude_row, exclude_col):
        """Place mines randomly, excluding the first clicked position"""
        positions = []
        for r in range(self.height):
            for c in range(self.width):
                if r != exclude_row or c != exclude_col:
                    positions.append((r, c))
        
        mine_positions = random.sample(positions, self.mines)
        
        for r, c in mine_positions:
            self.mine_board[r][c] = -1
            
        # Calculate numbers around mines
        for r in range(self.height):
            for c in range(self.width):
                if self.mine_board[r][c] != -1:
                    self.mine_board[r][c] = self.count_adjacent_mines(r, c)
    
    def count_adjacent_mines(self, row, col):
        """Count mines adjacent to a cell"""
        count = 0
        for dr in [-1, 0, 1]:
            for dc in [-1, 0, 1]:
                if dr == 0 and dc == 0:
                    continue
                nr, nc = row + dr, col + dc
                if 0 <= nr < self.height and 0 <= nc < self.width:
                    if self.mine_board[nr][nc] == -1:
                        count += 1
        return count
    
    def reveal_cell(self, row, col):
        """Reveal a cell and handle game logic"""
        if self.game_over or self.game_won:
            return
            
        if not (0 <= row < self.height and 0 <= col < self.width):
            return
            
        if self.revealed[row][col] or self.flagged[row][col]:
            return
            
        # First move - place mines
        if self.first_move:
            self.place_mines(row, col)
            self.first_move = False
            
        # Hit a mine
        if self.mine_board[row][col] == -1:
            self.game_over = True
            self.reveal_all_mines()
            return
            
        # Reveal the cell
        self.revealed[row][col] = True
        
        # If it's a zero, reveal adjacent cells
        if self.mine_board[row][col] == 0:
            for dr in [-1, 0, 1]:
                for dc in [-1, 0, 1]:
                    if dr == 0 and dc == 0:
                        continue
                    self.reveal_cell(row + dr, col + dc)
        
        # Check win condition
        self.check_win()
    
    def toggle_flag(self, row, col):
        """Toggle flag on a cell"""
        if self.game_over or self.game_won:
            return
            
        if not (0 <= row < self.height and 0 <= col < self.width):
            return
            
        if not self.revealed[row][col]:
            self.flagged[row][col] = not self.flagged[row][col]
    
    def reveal_all_mines(self):
        """Reveal all mine locations"""
        for r in range(self.height):
            for c in range(self.width):
                if self.mine_board[r][c] == -1:
                    self.revealed[r][c] = True
    
    def check_win(self):
        """Check if player has won"""
        revealed_count = 0
        for r in range(self.height):
            for c in range(self.width):
                if self.revealed[r][c]:
                    revealed_count += 1
        
        # Win condition: all non-mine cells revealed
        if revealed_count == self.width * self.height - self.mines:
            self.game_won = True
    
    def display_board(self):
        """Display the current game board"""
        os.system('clear' if os.name == 'posix' else 'cls')
        
        print("🎯 MINESWEEPER 🎯")
        print(f"Mines: {self.mines} | Flags: {sum(sum(row) for row in self.flagged)}")
        print()
        
        # Column numbers
        print("   ", end="")
        for c in range(self.width):
            print(f"{c:2}", end=" ")
        print()
        
        # Top border
        print("  ┌" + "──┬" * (self.width - 1) + "──┐")
        
        for r in range(self.height):
            print(f"{r:2}│", end="")
            
            for c in range(self.width):
                if self.revealed[r][c]:
                    if self.mine_board[r][c] == -1:
                        print("💣", end="│")
                    elif self.mine_board[r][c] == 0:
                        print("  ", end="│")
                    else:
                        print(f"{self.mine_board[r][c]:2}", end="│")
                elif self.flagged[r][c]:
                    print("🚩", end="│")
                else:
                    print("⬜", end="│")
            
            print()
            
            if r < self.height - 1:
                print("  ├" + "──┼" * (self.width - 1) + "──┤")
        
        # Bottom border
        print("  └" + "──┴" * (self.width - 1) + "──┘")
        
        if self.game_over:
            print("\n💥 GAME OVER! You hit a mine!")
        elif self.game_won:
            print("\n🎉 CONGRATULATIONS! You cleared all mines!")
        else:
            print("\nCommands: r <row> <col> to reveal, f <row> <col> to flag, q to quit")

def main():
    """Main game loop"""
    print("Welcome to Minesweeper!")
    print("Choose difficulty:")
    print("1. Beginner (9x9, 10 mines)")
    print("2. Intermediate (16x16, 40 mines)")
    print("3. Expert (16x30, 99 mines)")
    print("4. Custom")
    
    choice = input("Enter your choice (1-4): ").strip()
    
    if choice == "1":
        game = Minesweeper(9, 9, 10)
    elif choice == "2":
        game = Minesweeper(16, 16, 40)
    elif choice == "3":
        game = Minesweeper(30, 16, 99)
    elif choice == "4":
        width = int(input("Enter width: "))
        height = int(input("Enter height: "))
        mines = int(input("Enter number of mines: "))
        game = Minesweeper(width, height, mines)
    else:
        print("Invalid choice. Starting with beginner level.")
        game = Minesweeper(9, 9, 10)
    
    while True:
        game.display_board()
        
        if game.game_over or game.game_won:
            play_again = input("\nPlay again? (y/n): ").lower()
            if play_again == 'y':
                main()
                break
            else:
                print("Thanks for playing!")
                break
        
        command = input("\nEnter command: ").strip().lower()
        
        if command == 'q':
            print("Thanks for playing!")
            break
        
        parts = command.split()
        if len(parts) != 3:
            continue
            
        action, row, col = parts[0], int(parts[1]), int(parts[2])
        
        if action == 'r':
            game.reveal_cell(row, col)
        elif action == 'f':
            game.toggle_flag(row, col)

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\nGame interrupted. Thanks for playing!")
        sys.exit(0)