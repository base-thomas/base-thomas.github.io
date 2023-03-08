
let gbc = false; //var for storing intergenerational best creature
let to = undefined; //var storing setTimeout id
let stop = false; //flag for run flow control
let lastdp = false; //var for tracking restart index for continueDet
let dLayer = 1; //current deterministic layer
let dPoint = [1]; //deterministic path data (using index2id nums)
let dLayerMin = 0; //layer at which continueDet stops recursing
let saveDet = []; //var for storing deterministic run starts --> goes action[0] --> save[0] --> action[1] etc
let branches = 0; //now just a branch count, previously an array for storing all deterministic branches
let totalBranches = 0; //total (sum) for full det runs
let bestDetBranch = [0, 0, 0, 0, ``, ``]; //var for storing best cps score, current cookies, total cookies earned, #branch, dPoint string, and save point
let runTime = 0; //track total time elapsed
let segTime = 0; //track time per det segment
let cIndex = 0; //index of current creature (run)
let nInvalid = 0; //number of unsuccessful clicks & buys
let detMaxClicks = 15;//2;
let iteration = 0;
let plot = []; //array to track performance over generations
let rewardStore = []; //tracking total reward for each run
let totalReward = 0; //total value from iterative reward func
let numActions = 6; //just pi2index for now (no donothing)
let numStates = 7; //number of columns in state tensors
let eps = 0; //epsilon var (explore vs exploit factor)
let rNum = 0;
const maxiteration = 52;
const maxClicks = 15;
const nCreatures = 20;
const index2id = [-2, -1, 0, 1, 2, 3, 0, 1, 2, 3, 7, 8, 9, 10, 11, 16, 57, 75]; //convert output index to building/upgrade ingame id (-2 is do nothing, -1 is click big cookie)
const pi2index = [0, 1, 2, 6, 7, 8, 17]; //same thing but for permute options (use: index2id[pi2index[i]] ) --> donothing, click, cursor, cursor_up1 (req 1), cursor_up2 (req 1), cursor_up3 (req 10)
const start777 = 'Mi4wNDh8fDE2NzcxMDk0NTI2OTM7MTY3NzEwOTQ1MjY5NjsxNjc3MTA5OTY4NTE2O0NydW1ibHkgUGl4aWU7eGtoeGJ8MTExMTExMDExMDAxMDExMDAxMDEwMTEwMDAxfDA7MDswOzE7MDswOzA7MDswOzA7MDswOzA7MDswOzE7MDswOzA7MDswOzA7OzA7MDswOzA7MDswOzA7LTE7LTE7LTE7LTE7LTE7MDswOzA7MDs3NTswOzA7LTE7LTE7MTY3NzEwOTQ1MjY5NzswOzA7OzQxOzA7MDswOzUwO3wwLDAsMCwwLCwwLDA7MCwwLDAsMCwsMCwwOzAsMCwwLDAsLDAsMDswLDAsMCwwLCwwLDA7MCwwLDAsMCwsMCwwOzAsMCwwLDAsLDAsMDswLDAsMCwwLCwwLDA7MCwwLDAsMCwsMCwwOzAsMCwwLDAsLDAsMDswLDAsMCwwLCwwLDA7MCwwLDAsMCwsMCwwOzAsMCwwLDAsLDAsMDswLDAsMCwwLCwwLDA7MCwwLDAsMCwsMCwwOzAsMCwwLDAsLDAsMDswLDAsMCwwLCwwLDA7MCwwLDAsMCwsMCwwOzAsMCwwLDAsLDAsMDswLDAsMCwwLCwwLDA7fDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMHwwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMTAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwfDYsMzkwLDI4Niw3Nzc7fENvb2tpZU1vbnN0ZXI6eyJzZXR0aW5ncyI6eyJDUFNNb2RlIjoxLCJBdmdDUFNIaXN0IjozLCJBdmdDbGlja3NIaXN0IjowLCJDYWxjV3JpbmsiOjAsIlNjYWxlIjoyLCJTY2FsZURlY2ltYWxzIjoyLCJTY2FsZVNlcGFyYXRvciI6MCwiU2NhbGVDdXRvZmYiOjk5OTk5OSwiVGltZUZvcm1hdCI6MCwiRGV0YWlsZWRUaW1lIjoxLCJQUERpc3BsYXlUaW1lIjowLCJCdWlsZENvbG91ciI6MSwiUFBPbmx5Q29uc2lkZXJCdXlhYmxlIjowLCJQUEV4Y2x1ZGVUb3AiOjAsIlBQUmlnaWRlbE1vZGUiOjAsIlBQU2Vjb25kc0xvd2VyTGltaXQiOjAsIkNvbG91ckJsdWUiOiIjNGJiOGYwIiwiQ29sb3VyR3JlZW4iOiIjMDBmZjAwIiwiQ29sb3VyWWVsbG93IjoiI2ZmZmYwMCIsIkNvbG91ck9yYW5nZSI6IiNmZjdmMDAiLCJDb2xvdXJSZWQiOiIjZmYwMDAwIiwiQ29sb3VyUHVycGxlIjoiI2ZmMDBmZiIsIkNvbG91ckdyYXkiOiIjYjNiM2IzIiwiQ29sb3VyUGluayI6IiNmZjE0OTMiLCJDb2xvdXJCcm93biI6IiM4YjQ1MTMiLCJCb3RCYXIiOjEsIlRpbWVyQmFyIjoxLCJUaW1lckJhclBvcyI6MCwiVGltZXJCYXJPdmVybGF5IjoyLCJBdXRvc2F2ZVRpbWVyQmFyIjowLCJVcEJhckNvbG91ciI6MSwiVXBncmFkZUJhckZpeGVkUG9zIjoxLCJTb3J0QnVpbGRpbmdzIjowLCJTb3J0VXBncmFkZXMiOjAsIlVwZ3JhZGVzTmV2ZXJDb2xsYXBzZSI6MCwiRHJhZ29uQXVyYUluZm8iOjEsIkdyaW1vaXJlQmFyIjoxLCJHQ1RpbWVyIjoxLCJGYXZpY29uIjoxLCJXcmlua2xlckJ1dHRvbnMiOjEsIkhpZGVTZWN0aW9uc0J1dHRvbnMiOjAsIlRvb2x0aXBCdWlsZFVwZ3JhZGUiOjEsIlRvb2x0aXBBbW9yIjowLCJUb29sV2Fybkx1Y2t5IjoxLCJUb29sV2Fybkx1Y2t5RnJlbnp5IjoxLCJUb29sV2FybkNvbmp1cmUiOjEsIlRvb2xXYXJuQ29uanVyZUZyZW56eSI6MSwiVG9vbFdhcm5FZGlmaWNlIjoxLCJUb29sV2FyblVzZXIiOjAsIlRvb2xXYXJuQm9uIjoxLCJUb29sV2FyblBvcyI6MSwiVG9vbHRpcEdyaW0iOjEsIlRvb2x0aXBXcmluayI6MSwiVG9vbHRpcEx1bXAiOjEsIlRvb2x0aXBQbG90cyI6MSwiVG9vbHRpcFBhbnRoZW9uIjoxLCJUb29sdGlwQXNjZW5kQnV0dG9uIjoxLCJTdGF0cyI6MSwiTWlzc2luZ1VwZ3JhZGVzIjoxLCJNaXNzaW5nQWNoaWV2ZW1lbnRzIjowLCJVcFN0YXRzIjoxLCJIZWF2ZW5seUNoaXBzVGFyZ2V0IjoxLCJTaG93TWlzc2VkR0MiOjEsIlRpdGxlIjoxLCJHZW5lcmFsU291bmQiOjEsIkdDTm90aWZpY2F0aW9uIjowLCJHQ0ZsYXNoIjoxLCJDb2xvdXJHQ0ZsYXNoIjoiI2ZmZmZmZiIsIkdDU291bmQiOjEsIkdDVm9sdW1lIjoxMDAsIkdDU291bmRVUkwiOiJodHRwczovL2ZyZWVzb3VuZC5vcmcvZGF0YS9wcmV2aWV3cy82Ni82NjcxN185MzE2NTUtbHEubXAzIiwiRm9ydHVuZU5vdGlmaWNhdGlvbiI6MCwiRm9ydHVuZUZsYXNoIjoxLCJDb2xvdXJGb3J0dW5lRmxhc2giOiIjZmZmZmZmIiwiRm9ydHVuZVNvdW5kIjoxLCJGb3J0dW5lVm9sdW1lIjoxMDAsIkZvcnR1bmVTb3VuZFVSTCI6Imh0dHBzOi8vZnJlZXNvdW5kLm9yZy9kYXRhL3ByZXZpZXdzLzE3NC8xNzQwMjdfMzI0MjQ5NC1scS5tcDMiLCJTZWFOb3RpZmljYXRpb24iOjAsIlNlYUZsYXNoIjoxLCJDb2xvdXJTZWFGbGFzaCI6IiNmZmZmZmYiLCJTZWFTb3VuZCI6MSwiU2VhVm9sdW1lIjoxMDAsIlNlYVNvdW5kVVJMIjoiaHR0cHM6Ly93d3cuZnJlZXNvdW5kLm9yZy9kYXRhL3ByZXZpZXdzLzEyMS8xMjEwOTlfMjE5MzI2Ni1scS5tcDMiLCJHYXJkRmxhc2giOjEsIkNvbG91ckdhcmRGbGFzaCI6IiNmZmZmZmYiLCJHYXJkU291bmQiOjEsIkdhcmRWb2x1bWUiOjEwMCwiR2FyZFNvdW5kVVJMIjoiaHR0cHM6Ly9mcmVlc291bmQub3JnL2RhdGEvcHJldmlld3MvMTAzLzEwMzA0Nl84NjE3MTQtbHEubXAzIiwiTWFnaWNOb3RpZmljYXRpb24iOjAsIk1hZ2ljRmxhc2giOjEsIkNvbG91ck1hZ2ljRmxhc2giOiIjZmZmZmZmIiwiTWFnaWNTb3VuZCI6MSwiTWFnaWNWb2x1bWUiOjEwMCwiTWFnaWNTb3VuZFVSTCI6Imh0dHBzOi8vZnJlZXNvdW5kLm9yZy9kYXRhL3ByZXZpZXdzLzIyMS8yMjE2ODNfMTAxNTI0MC1scS5tcDMiLCJXcmlua2xlck5vdGlmaWNhdGlvbiI6MCwiV3JpbmtsZXJGbGFzaCI6MSwiQ29sb3VyV3JpbmtsZXJGbGFzaCI6IiNmZmZmZmYiLCJXcmlua2xlclNvdW5kIjoxLCJXcmlua2xlclZvbHVtZSI6MTAwLCJXcmlua2xlclNvdW5kVVJMIjoiaHR0cHM6Ly9mcmVlc291bmQub3JnL2RhdGEvcHJldmlld3MvMTI0LzEyNDE4Nl84MDQzLWxxLm1wMyIsIldyaW5rbGVyTWF4Tm90aWZpY2F0aW9uIjowLCJXcmlua2xlck1heEZsYXNoIjoxLCJDb2xvdXJXcmlua2xlck1heEZsYXNoIjoiI2ZmZmZmZiIsIldyaW5rbGVyTWF4U291bmQiOjEsIldyaW5rbGVyTWF4Vm9sdW1lIjoxMDAsIldyaW5rbGVyTWF4U291bmRVUkwiOiJodHRwczovL2ZyZWVzb3VuZC5vcmcvZGF0YS9wcmV2aWV3cy8xNTIvMTUyNzQzXzE1NjYzLWxxLm1wMyIsIkJ1bGtCdXlCbG9jayI6MSwiRmF2b3VyaXRlU2V0dGluZ3MiOjF9LCJoZWFkZXJzIjp7IkZhdm91cml0ZSI6MSwiQ2FsY3VsYXRpb24iOjEsIk5vdGF0aW9uIjoxLCJDb2xvdXJzIjoxLCJCYXJzRGlzcGxheSI6MSwiVG9vbHRpcCI6MSwiU3RhdGlzdGljcyI6MSwiTm90aWZpY2F0aW9uIjoxLCJOb3RpZmljYXRpb25HZW5lcmFsIjoxLCJOb3RpZmljYXRpb25HQyI6MSwiTm90aWZpY2F0aW9uRkMiOjEsIk5vdGlmaWNhdGlvblNlYSI6MSwiTm90aWZpY2F0aW9uR2FyZCI6MSwiTm90aWZpY2F0aW9uTWFnaSI6MSwiTm90aWZpY2F0aW9uV3JpbmsiOjEsIk5vdGlmaWNhdGlvbldyaW5rTWF4IjoxLCJNaXNjZWxsYW5lb3VzIjoxLCJMdWNreSI6MSwiQ2hhaW4iOjEsIlNwZWxscyI6MSwiR2FyZGVuIjoxLCJQcmVzdGlnZSI6MSwiV3JpbmsiOjEsIlNlYSI6MSwiQWNoaWV2cyI6MSwiTWlzYyI6MSwiaW5mb01lbnUiOjEsIm9wdGlvbnNNZW51IjoxfSwiZmF2b3VyaXRlU2V0dGluZ3MiOltdLCJ2ZXJzaW9uIjoiMi4wNDguMTAifTtjb29raWVNb25zdGVyRnJhbWV3b3JrOnsic2V0dGluZ3MiOnt9LCJoZWFkZXJzIjp7ImluZm9NZW51IjoxLCJvcHRpb25zTWVudSI6MX0sImZhdm91cml0ZVNldHRpbmdzIjpbXX07%21END%21';
const nosound777 = 'Mi4wNDh8fDE2NzcxMDk0NTI2OTM7MTY3NzEwOTQ1MjY5NjsxNjc3NjI0MzIyMDA3O0NydW1ibHkgUGl4aWU7eGtoeGJ8MTExMTExMDExMDAxMDExMDAxMDEwMTEwMDAxfDA7MDswOzE7MDswOzA7MDswOzA7MDswOzA7MDswOzE7MDswOzA7MDswOzA7OzA7MDswOzA7MDswOzA7LTE7LTE7LTE7LTE7LTE7MDswOzA7MDswOzA7MDstMTstMTsxNjc3MTA5NDUyNjk3OzA7MDs7NDE7MDswOzA7NTA7fDAsMCwwLDAsLDAsMDswLDAsMCwwLCwwLDA7MCwwLDAsMCwsMCwwOzAsMCwwLDAsLDAsMDswLDAsMCwwLCwwLDA7MCwwLDAsMCwsMCwwOzAsMCwwLDAsLDAsMDswLDAsMCwwLCwwLDA7MCwwLDAsMCwsMCwwOzAsMCwwLDAsLDAsMDswLDAsMCwwLCwwLDA7MCwwLDAsMCwsMCwwOzAsMCwwLDAsLDAsMDswLDAsMCwwLCwwLDA7MCwwLDAsMCwsMCwwOzAsMCwwLDAsLDAsMDswLDAsMCwwLCwwLDA7MCwwLDAsMCwsMCwwOzAsMCwwLDAsLDAsMDt8MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwfDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAxMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDB8NiwzOTAsMjQ0LDc3NywwLDA7fENvb2tpZU1vbnN0ZXI6eyJzZXR0aW5ncyI6eyJDUFNNb2RlIjoxLCJBdmdDUFNIaXN0IjozLCJBdmdDbGlja3NIaXN0IjowLCJDYWxjV3JpbmsiOjAsIlNjYWxlIjoyLCJTY2FsZURlY2ltYWxzIjoyLCJTY2FsZVNlcGFyYXRvciI6MCwiU2NhbGVDdXRvZmYiOjk5OTk5OSwiVGltZUZvcm1hdCI6MCwiRGV0YWlsZWRUaW1lIjoxLCJQUERpc3BsYXlUaW1lIjowLCJCdWlsZENvbG91ciI6MSwiUFBPbmx5Q29uc2lkZXJCdXlhYmxlIjowLCJQUEV4Y2x1ZGVUb3AiOjAsIlBQUmlnaWRlbE1vZGUiOjAsIlBQU2Vjb25kc0xvd2VyTGltaXQiOjAsIkNvbG91ckJsdWUiOiIjNGJiOGYwIiwiQ29sb3VyR3JlZW4iOiIjMDBmZjAwIiwiQ29sb3VyWWVsbG93IjoiI2ZmZmYwMCIsIkNvbG91ck9yYW5nZSI6IiNmZjdmMDAiLCJDb2xvdXJSZWQiOiIjZmYwMDAwIiwiQ29sb3VyUHVycGxlIjoiI2ZmMDBmZiIsIkNvbG91ckdyYXkiOiIjYjNiM2IzIiwiQ29sb3VyUGluayI6IiNmZjE0OTMiLCJDb2xvdXJCcm93biI6IiM4YjQ1MTMiLCJCb3RCYXIiOjEsIlRpbWVyQmFyIjoxLCJUaW1lckJhclBvcyI6MCwiVGltZXJCYXJPdmVybGF5IjoyLCJBdXRvc2F2ZVRpbWVyQmFyIjowLCJVcEJhckNvbG91ciI6MSwiVXBncmFkZUJhckZpeGVkUG9zIjoxLCJTb3J0QnVpbGRpbmdzIjowLCJTb3J0VXBncmFkZXMiOjAsIlVwZ3JhZGVzTmV2ZXJDb2xsYXBzZSI6MCwiRHJhZ29uQXVyYUluZm8iOjEsIkdyaW1vaXJlQmFyIjoxLCJHQ1RpbWVyIjoxLCJGYXZpY29uIjoxLCJXcmlua2xlckJ1dHRvbnMiOjEsIkhpZGVTZWN0aW9uc0J1dHRvbnMiOjAsIlRvb2x0aXBCdWlsZFVwZ3JhZGUiOjEsIlRvb2x0aXBBbW9yIjowLCJUb29sV2Fybkx1Y2t5IjoxLCJUb29sV2Fybkx1Y2t5RnJlbnp5IjoxLCJUb29sV2FybkNvbmp1cmUiOjEsIlRvb2xXYXJuQ29uanVyZUZyZW56eSI6MSwiVG9vbFdhcm5FZGlmaWNlIjoxLCJUb29sV2FyblVzZXIiOjAsIlRvb2xXYXJuQm9uIjoxLCJUb29sV2FyblBvcyI6MSwiVG9vbHRpcEdyaW0iOjEsIlRvb2x0aXBXcmluayI6MSwiVG9vbHRpcEx1bXAiOjEsIlRvb2x0aXBQbG90cyI6MSwiVG9vbHRpcFBhbnRoZW9uIjoxLCJUb29sdGlwQXNjZW5kQnV0dG9uIjoxLCJTdGF0cyI6MSwiTWlzc2luZ1VwZ3JhZGVzIjoxLCJNaXNzaW5nQWNoaWV2ZW1lbnRzIjowLCJVcFN0YXRzIjoxLCJIZWF2ZW5seUNoaXBzVGFyZ2V0IjoxLCJTaG93TWlzc2VkR0MiOjEsIlRpdGxlIjoxLCJHZW5lcmFsU291bmQiOjEsIkdDTm90aWZpY2F0aW9uIjowLCJHQ0ZsYXNoIjoxLCJDb2xvdXJHQ0ZsYXNoIjoiI2ZmZmZmZiIsIkdDU291bmQiOjEsIkdDVm9sdW1lIjoxMDAsIkdDU291bmRVUkwiOiJodHRwczovL2ZyZWVzb3VuZC5vcmcvZGF0YS9wcmV2aWV3cy82Ni82NjcxN185MzE2NTUtbHEubXAzIiwiRm9ydHVuZU5vdGlmaWNhdGlvbiI6MCwiRm9ydHVuZUZsYXNoIjoxLCJDb2xvdXJGb3J0dW5lRmxhc2giOiIjZmZmZmZmIiwiRm9ydHVuZVNvdW5kIjoxLCJGb3J0dW5lVm9sdW1lIjoxMDAsIkZvcnR1bmVTb3VuZFVSTCI6Imh0dHBzOi8vZnJlZXNvdW5kLm9yZy9kYXRhL3ByZXZpZXdzLzE3NC8xNzQwMjdfMzI0MjQ5NC1scS5tcDMiLCJTZWFOb3RpZmljYXRpb24iOjAsIlNlYUZsYXNoIjoxLCJDb2xvdXJTZWFGbGFzaCI6IiNmZmZmZmYiLCJTZWFTb3VuZCI6MSwiU2VhVm9sdW1lIjoxMDAsIlNlYVNvdW5kVVJMIjoiaHR0cHM6Ly93d3cuZnJlZXNvdW5kLm9yZy9kYXRhL3ByZXZpZXdzLzEyMS8xMjEwOTlfMjE5MzI2Ni1scS5tcDMiLCJHYXJkRmxhc2giOjEsIkNvbG91ckdhcmRGbGFzaCI6IiNmZmZmZmYiLCJHYXJkU291bmQiOjEsIkdhcmRWb2x1bWUiOjEwMCwiR2FyZFNvdW5kVVJMIjoiaHR0cHM6Ly9mcmVlc291bmQub3JnL2RhdGEvcHJldmlld3MvMTAzLzEwMzA0Nl84NjE3MTQtbHEubXAzIiwiTWFnaWNOb3RpZmljYXRpb24iOjAsIk1hZ2ljRmxhc2giOjEsIkNvbG91ck1hZ2ljRmxhc2giOiIjZmZmZmZmIiwiTWFnaWNTb3VuZCI6MSwiTWFnaWNWb2x1bWUiOjEwMCwiTWFnaWNTb3VuZFVSTCI6Imh0dHBzOi8vZnJlZXNvdW5kLm9yZy9kYXRhL3ByZXZpZXdzLzIyMS8yMjE2ODNfMTAxNTI0MC1scS5tcDMiLCJXcmlua2xlck5vdGlmaWNhdGlvbiI6MCwiV3JpbmtsZXJGbGFzaCI6MSwiQ29sb3VyV3JpbmtsZXJGbGFzaCI6IiNmZmZmZmYiLCJXcmlua2xlclNvdW5kIjoxLCJXcmlua2xlclZvbHVtZSI6MTAwLCJXcmlua2xlclNvdW5kVVJMIjoiaHR0cHM6Ly9mcmVlc291bmQub3JnL2RhdGEvcHJldmlld3MvMTI0LzEyNDE4Nl84MDQzLWxxLm1wMyIsIldyaW5rbGVyTWF4Tm90aWZpY2F0aW9uIjowLCJXcmlua2xlck1heEZsYXNoIjoxLCJDb2xvdXJXcmlua2xlck1heEZsYXNoIjoiI2ZmZmZmZiIsIldyaW5rbGVyTWF4U291bmQiOjEsIldyaW5rbGVyTWF4Vm9sdW1lIjoxMDAsIldyaW5rbGVyTWF4U291bmRVUkwiOiJodHRwczovL2ZyZWVzb3VuZC5vcmcvZGF0YS9wcmV2aWV3cy8xNTIvMTUyNzQzXzE1NjYzLWxxLm1wMyIsIkJ1bGtCdXlCbG9jayI6MSwiRmF2b3VyaXRlU2V0dGluZ3MiOjF9LCJoZWFkZXJzIjp7IkZhdm91cml0ZSI6MSwiQ2FsY3VsYXRpb24iOjEsIk5vdGF0aW9uIjoxLCJDb2xvdXJzIjoxLCJCYXJzRGlzcGxheSI6MSwiVG9vbHRpcCI6MSwiU3RhdGlzdGljcyI6MSwiTm90aWZpY2F0aW9uIjoxLCJOb3RpZmljYXRpb25HZW5lcmFsIjoxLCJOb3RpZmljYXRpb25HQyI6MSwiTm90aWZpY2F0aW9uRkMiOjEsIk5vdGlmaWNhdGlvblNlYSI6MSwiTm90aWZpY2F0aW9uR2FyZCI6MSwiTm90aWZpY2F0aW9uTWFnaSI6MSwiTm90aWZpY2F0aW9uV3JpbmsiOjEsIk5vdGlmaWNhdGlvbldyaW5rTWF4IjoxLCJNaXNjZWxsYW5lb3VzIjoxLCJMdWNreSI6MSwiQ2hhaW4iOjEsIlNwZWxscyI6MSwiR2FyZGVuIjoxLCJQcmVzdGlnZSI6MSwiV3JpbmsiOjEsIlNlYSI6MSwiQWNoaWV2cyI6MSwiTWlzYyI6MSwiaW5mb01lbnUiOjEsIm9wdGlvbnNNZW51IjoxfSwiZmF2b3VyaXRlU2V0dGluZ3MiOltdLCJ2ZXJzaW9uIjoiMi4wNDguMTAifTtjb29raWVNb25zdGVyRnJhbWV3b3JrOnsic2V0dGluZ3MiOnt9LCJoZWFkZXJzIjp7ImluZm9NZW51IjoxLCJvcHRpb25zTWVudSI6MX0sImZhdm91cml0ZVNldHRpbmdzIjpbXX07%21END%21';
const verbose = false; //flag for including more console outputs for debugging
const ssound = false; //flag for sound/nosound
const tickRate = 32; //ms
const MAX_EPSILON = 0.2;
const MIN_EPSILON = 0.01;
const LAMBDA = 0.01;
const discountRate = 0.95;

Game.registerMod('CCWRAI',{

	//Default Methods

	init:function(){
		//Game.registerHook('reincarnate',function(){Game.mods['test mod'].addIntro();});
		//Game.registerHook('check',function(){if (!Game.playerIntro){Game.mods['test mod'].addIntro();}});
		//Game.registerHook('click',function(){Game.Notify(choose(['A good click.','A solid click.','A mediocre click.','An excellent click!']),'',0,0.5);});
		//Game.registerHook('cps',function(cps){return cps*2;});
		console.log('up to date commit #8.16')
		//this.initNetwork();
		/*let config = {
			model: [
				{nodeCount: 2, type: "input"}, //cookies, CpS, (total earned?)
				{nodeCount: 128, activationfunc: activation.RELU},
				{nodeCount: 7, type: "output", activationfunc: activation.RELU} //big click, 4 buildings, 12 upgrades
			],
			mutationRate: 0.05 * 2,
			crossoverMethod: crossover.SLICE,//RANDOM,
			mutationMethod: mutate.RANDOM,
			populationSize: nCreatures
		};
		this.neat = new NEAT(config);*/
	},
	save:function(){
		//note: we use stringified JSON for ease and clarity but you could store any type of string
		//return JSON.stringify({text:Game.playerIntro})
	},
	load:function(str){
		//var data=JSON.parse(str);
		//if (data.text) Game.mods['CCWRAI'].addIntro(data.text);
	},
	/*addIntro:function(text){
		//note: this is not a mod hook, just a function that's part of the mod
		Game.playerIntro=text||choose(['oh snap, it\'s','watch out, it\'s','oh no! here comes','hide your cookies, for here comes','behold! it\'s']);
		if (!l('bakerySubtitle')) l('bakeryName').insertAdjacentHTML('afterend','<div id="bakerySubtitle" class="title" style="text-align:center;position:absolute;left:0px;right:0px;bottom:32px;font-size:12px;pointer-events:none;text-shadow:0px 1px 1px #000,0px 0px 4px #f00;opacity:0.8;"></div>');
		l('bakerySubtitle').textContent='~'+Game.playerIntro+'~';
	},*/
	beautifyTime:function(te){
		let teh = Math.floor(te / (60*60*1000));
		let tem = Math.floor((te - teh*(60*60*1000)) / (60*1000));
		return `${teh === 0 ? `` : `${teh}hr `}${tem}min ${Math.round((te - teh*(60*60*1000) - tem*(60*1000)) / 100) / 10}s`;
	},


	//Deterministic Method(s)

	startDetermining:function(){
		if (saveDet.length === 0) { //start fresh
			console.warn(`Starting New Deterministic Run`);
			segTime = Date.now();
			if (runTime === 0) { //theres not an active run
				runTime = segTime;
			}
			this.AIload(); //load starting x777 save
			setTimeout(() => {this.AIclickCookie()}, tickRate); //always have to start with a click
			//setTimeout(() => {this.setDetSavePt()}, tickRate*2, 0); //anchor run to starting save
			to = setTimeout(() => {this.continueDetermining()}, tickRate*2);
		} else { //start from a previous branch fragment
			if (verbose) {console.log(`Restarting Deterministic Run Layer ${dLayer}`);}
			this.AIload(saveDet[dLayer - 1]);
			to = setTimeout(() => {this.continueDetermining()}, tickRate);
		}
	},
	continueDetermining:function(){
		if (to) {clearTimeout(to);}
		if (stop) {
			//export progress?
			return;
		} else {
			if (!dPoint || !dLayer) {console.error("ERROR: dPoint or dLayer unspecified");}
			dps = `${dPoint[0]}`; //det pt string
			for (let j = 1; j < dPoint.length; j++) {dps = `${dps}, ${dPoint[j]}`;}
			if (verbose) {console.log(`Layer ${dLayer} with ${Game.cookies} cookies in bank --> dPoint (${dps}):`);}

			let starti //start each new layer >= 1 since 'do nothing' wont be called til all clicks are used
			if (!lastdp) { //new (forwards) layer
				starti = 1;
				if (!saveDet[dLayer - 1]) {
					this.setDetSavePt(dLayer - 1); //new save at complete (prev) layer
				}
			} else {
				starti = lastdp + 1; //layer in progress, continue i from earlier
				lastdp = false; //reset flag
			}
			//if (verbose) {console.log(`Iterating layer ${dLayer} from i = ${starti}`);}
			for (let i = starti; i < pi2index.length; i++) {
				let p = pi2index[i];
				if (this.AIcanBuyThing(p)) {
					this.AIbuyThing(p);
					dPoint.push(p); //add next layer entry
					dLayer++;
					to = setTimeout(() => {this.continueDetermining()}, tickRate);
					return;
				} else if (index2id[p] === -1) { //cant click bc >= detMaxClicks, so end branch
					break;
				}
			}
			dLayer--; //the layer is done
			//branches.push([dps, Game.cookiesEarned, Game.cookiesPs, dPoint.length]); //data, cookies earned, cps, total time (or #clicks)
			branches++;
			console.warn(`Branch ${branches} complete --> (${dps}) --> (cookies: ${Math.round(Game./*handmadeCookies*/cookiesEarned*10)/10}, CpS: ${Math.round(Game.cookiesPs*10)/10})`);
			lastSave = saveDet.pop(); //also remove last save layer (rolling back to prev layer)
			lastdp = dPoint.pop(); //remove last point element and save it so next continue knows what index to start at
			if (Game.handmadeCookies/*cookiesPs*/ > bestDetBranch[1/*0*/] || (Game.handmadeCookies/*cookiesPs*/ === bestDetBranch[1/*0*/] && (dps.match(/,/g)||[]).length <= (bestDetBranch[4].match(/,/g)||[]).length)) {
				bestDetBranch = [Game.cookiesPs, Game.handmadeCookies, Game.cookies/*Earned*/, branches, dps, lastSave];
			}
			if (dPoint.length <= dLayerMin) {
				this.endDetermining(); //end deterministic run, for now (testing)
			} else {
				to = setTimeout(() => {this.startDetermining()}, tickRate);
				//return;
			}
		}
	},
	setDetSavePt:function(layer){
		if (layer) {
			if (verbose) {console.log(`new savedet point created --> layer ${layer}`);}
			saveDet[layer] = Game.WriteSave(1);
		} else { //shouldnt be getting called without layer arg
			console.warn(`new ORIGIN savedet point created --> layer 0`);
			saveDet = [Game.WriteSave(1)]; //also resets saveDet var in case of multiple runs
		}
	},
	endDetermining:function(){
		//export progress?
		if (detMaxClicks < maxClicks) { //permute the next click
			console.log(`DETERMINISTIC SEGMENT DONE - ${branches} BRANCHES - (Max Clicks: ${detMaxClicks}) --> ${this.beautifyTime(Date.now() - segTime)}`);
			console.log(`BEST BRANCH PATH --> ${bestDetBranch[4]}`)
			//reset all variables incl dPoint, dLayer, branches, detSave, lastdp
			segTime = Date.now();
			detMaxClicks++;
			totalBranches += branches;
			branches = 0;
			lastdp = false;
			dLayer = (bestDetBranch[4].match(/,/g) || []).length + 1; //indexes to the the next blank spot in dPoint
			dLayerMin = dLayer - 1;
			saveDet[dLayerMin] = bestDetBranch[5]; //transfer best branch save to save array
			if (saveDet[dLayerMin + 1]) {console.warn(`WARNING: saveDet needs to be trimmed? (more entries past dlayerMin index)`)}
			dPoint = bestDetBranch[4].split(',');
			for (let i = 0; i < dLayer; i++) { //rebuild dPoint from dps string
				dPoint[i] = Number(dPoint[i]);//
			}
			if (verbose) {console.log(`Reconstructed dLayer: ${dLayer} --> dPoint (below):`);}
			if (verbose) {console.log(dPoint);}
			to = setTimeout(() => {this.startDetermining()}, tickRate);
		} else { //completely done
			console.log(`DETERMINISTIC SEGMENT DONE - ${branches} BRANCHES - (Max Clicks: ${detMaxClicks}) --> ${this.beautifyTime(Date.now() - segTime)}`);
			runTime = `TOTAL TIME ELAPSED: ${this.beautifyTime(Date.now() - runTime)}`;
			console.log(`FULL DETERMINISTIC RUN DONE - ${totalBranches} BRANCHES - (Max Clicks: ${detMaxClicks}) --> ${runTime}`);
			console.log(`BEST BRANCH PATH --> ${bestDetBranch[4]}`)
			runTime = 0; //reset in case I want to rerun the whole det
		}
	},


	//AI Interface Methods

	AIload:function(s){
		let r = false
		if (s) {
			r = Game.ImportSaveCode(s);
			if (verbose) {console.log(`----- AI loaded save (clicks: ${Game.cookieClicks}, cookies: ${Game.cookies}, CpS: ${Game.cookiesPs}) -----`);}
		} else if (ssound) {
			r = Game.ImportSaveCode(start777);
			if (verbose) {console.log("----- AI loaded save (x777 start) -----");}
		} else {
			r = Game.ImportSaveCode(nosound777);
			if (verbose) {console.log("----- AI loaded save (x777 start) (no sound) -----");}
		}
		if (!r) {console.error('LOAD FAILED');}
		Game.T = 3;
	},
	AIlog:function(s){
		//save to a file?
	},
	AIclickCookie:function(){
		if (Game.cookieClicks < maxClicks) {
			/*let te = console.timeLog('runtime') //time elapsed since this run (creature) started
			let tem = Math.floor(te/60000)
			if (tem > 9) {te = `${tem}:${te-tem*60000}`;} else {te = `0${tem}:${te-tem*60000}`;} //beautify time elapsed*/
			//console.log(`[${iteration < 10 ? '0' + iteration : iteration}] AI click cookie`);
			if (verbose) {console.log(`<<<<< Click big cookie! >>>>>`);}
			Game.BigCookieState=2;
			setTimeout(function() {Game.BigCookieState=0}, 100);
			let oldc = Game.cookies;
			Game.ClickCookie();
			if (oldc === Game.cookies) {console.error(`CLICK HAD NO EFFECT! --> Game.T = ${Game.T} & time diff = ${Date.now()-Game.lastClick} (gen)`);}
		} else {
			if (verbose) {console.log(`>>>>> Click big cookie (too many) <<<<<`);}
		}
	},
	AIbuyThing:function(index){
		//(Format) ingame id - info

		//Buildings
			//0 - cursor - 15
			//1 - grandma - 100
			//2 - farm - 1100
			//3 - mine - 12000

		//Upgrades
			//0 - mouse/cursor 2x #1 - 100 - req 1 - "Reinforced index finger"
			//1 - mouse/cursor 2x #2 - 500 - req 1 - "Carpal tunnel prevention cream"
			//2 - mouse/cursor 2x #3 - 10,000 - req 10 - "Ambidextrous"
			//3 - mouse/cursor +0.1c per bldg - 100,000 - req 25 - "Thousand fingers"
			//7 - grandma 2x #1 - 1,000 - req 1 - "Forwards from grandma"
			//8 - grandma 2x #2 - 5,000 - req 5 - "Steel-plated rolling pins"
			//9 - grandma 2x #3 - 50,000 - req 25 - "Lubricated dentures"
			//10 - farm 2x #1 - 11,000 - req 1 - "Cheap hoes"
			//11 - farm 2x #2 - 55,000 - req 5 - "Fertilizer"
			//16 - mine 2x #1 - 120,000 - req 1 - "Sugar gas"
			//57 - gma 2x & +1% farms per gma - 55,000 - req 15 farms 1 gma - "Farmer grandmas"
			//75 - click +1% of CpS - 50,000 - req 1000 handmade - "Plastic mouse"

		let i = index2id[index]
		/*let te = console.timeLog('runtime') //time elapsed since this run (creature) started
		let tem = Math.floor(te/60000)
		te = Math.round(te * 100) / 100
		if (tem > 9) {te = `${tem}:${te-tem*60000}`;} else {te = `0${tem}:${te-tem*60000}`;} //beautify time elapsed*/
		if (i === -2) {
			if (verbose) {console.log(`DO NOTHING :)`);}
			return;
		} else if (i === -1) { //actually a big cookie click
			this.AIclickCookie();
			return;
		}
		let it = iteration < 10 ? '0' + iteration : iteration;
		let s = false;
		if (index <= 3) { //building
			let thing = Game.ObjectsById[i];
			s = Game.cookies >= thing.getPrice();
			//if (s) {
			let cps = Game.cookiesPs
			if (verbose) {console.log(`Building: ${thing.name} (${thing.amount}) (price: ${thing.getPrice()}) with ${Game.cookies} cookies in bank`);} //[${it}]
			Game.ClickProduct(i);
			//if (s) {console.log(`Old CpS = ${cps} - New CpS = ${Game.cookiesPs}`)}
		} else { //upgrade
			let thing = Game.UpgradesById[i];
			s = thing.buy();
			//if (s) {
			let cps = Game.cookiesPs
			if (verbose) {console.log(`Upgrade: ${thing.name} (price: ${thing.getPrice()}) with ${Game.cookies} cookies in bank`);} //[${it}]
			//if (s) {console.log(`Old CpS = ${cps} - New CpS = ${Game.cookiesPs}`)}
		}
		return s
	},
	AIcanBuyThing:function(index) {
		let i = index2id[index];
		if (index < 0 || index >= index2id.length) {
			console.error(`ERROR: invalid index for index2id in AIcanBuyThing! --> ${index}`);
			return false;
		} else if (i === -2) { //'do nothing'
			return true;
		} else if (i === -1) { //big cookie click
			return Game.cookieClicks < detMaxClicks;
		} else if (index <= 3) { //building
			return Game.cookies >= Game.ObjectsById[i].getPrice();
		} else { //upgrade
			let u = Game.UpgradesById[i];
			let unlocked = false;
			if (i === 0 || i === 1) {
				unlocked = Game.ObjectsById[0].amount >= 1; //needs 1 cursor
			} else if (i === 2) {
				unlocked = Game.ObjectsById[0].amount >= 10; //needs 10 cursors
			} else if (i === 3) {
				unlocked = Game.ObjectsById[0].amount >= 25; //needs 25 cursors
			} else if (i === 7) {
				unlocked = Game.ObjectsById[1].amount >= 1; //needs 1 grandma
			} else if (i === 8) {
				unlocked = Game.ObjectsById[1].amount >= 5; //needs 5 grandmas
			} else if (i === 9) {
				unlocked = Game.ObjectsById[1].amount >= 25; //needs 25 grandmas
			} else if (i === 10) {
				unlocked = Game.ObjectsById[2].amount >= 1; //needs 1 farm
			} else if (i === 11) {
				unlocked = Game.ObjectsById[2].amount >= 5; //needs 5 farms
			} else if (i === 16) {
				unlocked = Game.ObjectsById[3].amount >= 1; //needs 1 mine
			} else if (i === 57) {
				unlocked = Game.ObjectsById[2].amount >= 15 && Game.ObjectsById[1].amount >= 1; //needs 15 farms & 1 gma
			} else if (i === 75) {
				unlocked = Game.handmadeCookies >= 1000; //needs 1000 handmade cookies
			}
			return unlocked && u.canBuy() && !u.bought; //cookie clicker actually only checks price vs cookies and .bought, I guess availability is gated by the store
		}
	},


	// RL Network Methods

	initNetwork:async function(hiddenLayerSizes){
		//
		this.network = tf.sequential();
		if (!Array.isArray(hiddenLayerSizes)) {
            hiddenLayerSizes = [hiddenLayerSizes];
        }
        this.network = tf.sequential();
        hiddenLayerSizes.forEach((hiddenLayerSize, i) => {
        this.network.add(tf.layers.dense({
            units: hiddenLayerSize,
            activation: 'relu',
            // `inputShape` is required only for the first layer.
            inputShape: i === 0 ? [numStates] : undefined
            }));
        });
        this.network.add(tf.layers.dense({units: numActions}));

        this.network.summary();
        this.network.compile({optimizer: 'adam', loss: 'meanSquaredError'});

		//prime the network for speed
		const gx = tf.zeros([1, numStates]);
		const gy = tf.zeros([1, numActions]);
		await this.network.fit(gx, gy);
	},
	predict:function(states){
        return tf.tidy(() => this.network.predict(states));
    },
    getState:function() {
    	// tensor array from 0 to numActions of count of upgrades/buildings
    	let s = [Game.handmadeCookies, Game.cookieClicks]; //change handmade to cookiesPs later
    	//for (let i = 0; i < numActions; i++) {
    		s.push(Game.ObjectsById[0].amount);
    	//}
    	for (let i = 3; i < pi2index.length; i++) {
    		s.push(Game.UpgradesById[index2id[pi2index[i]]].bought);
    	}
    	return tf.tidy(() => tf.tensor2d(s, [1, numStates]));
    },
    chooseAction:function(state, e) {
        if (Math.random() < e) {
            return Math.floor(Math.random() * this.numActions) - 1;
        } else {
            return tf.tidy(() => {
                const logits = this.predict(state);
                const sigmoid = tf.sigmoid(logits);
                const probs = tf.div(sigmoid, tf.sum(sigmoid));
                return tf.multinomial(probs, 1).dataSync()[0] - 1;
            });
        }
    },
    runAndReward:function(action) {
    	let r = 0;
    	if (this.AIcanBuyThing(action)) {
    		const hc = Game.handmadeCookies;
    		this.AIbuyThing(action);
    		r = (Game.handmadeCookies - hc)// + 100; //invalid action costs 100?
    	} else {nInvalid++;}
    	r -= 100;
    	return r / 10000; //reduce value of r to avoid vanishing gradient
    },


	// RL Flow Control Methods

	stopRun:function(){
		stop = true;
	},
	startRun: async function(hls){
		if (!this.network) {await this.initNetwork(hls ? hls : 64);}
		rNum++;
		rewardStore = [];
		iteration = 0;
		totalReward = 0;
		nInvalid = 0;
		eps = MAX_EPSILON;

		runTime = Date.now();
		this.AIload();
		to = setTimeout(() => {this.continueRun()}, tickRate);
	},
	continueRun:async function(){
		if (to) {clearTimeout(to);}
		if (stop) {return;}
		if (iteration >= maxiteration * 10 || Game.cookieClicks >= maxClicks) { //
			this.endRun();
		} else {
			const state = this.getState();
			const action = this.chooseAction(state, eps);
			const reward = this.runAndReward(pi2index[action]);

			//this.addSample([lastC, action, reward, Game.handmadeCookies]); //Save incremental situation for extra training
			iteration++;
			//eps = MIN_EPSILON + (MAX_EPSILON - MIN_EPSILON) * Math.exp(-LAMBDA * rNum); // Exponentially decay the exploration parameter
			totalReward += reward;

			to = setTimeout(() => {this.continueRun()}, tickRate);
			const qa = this.predict(this.getState());
			//const qa = reward + discountRate * this.predict(this.getState()).max().dataSync();
			const x = state//tf.tensor2d(state, [1, numStates]);
			const y = qa//tf.tensor2d(qa, [1, numActions]);
			await this.network.fit(x, y);
			if (verbose) {x.print();}
			//if (verbose) {y.print();}
			x.dispose();
			y.dispose();
		}
	},
	endRun:function(){
		rewardStore.push(totalReward);
		plot.push(Game.handmadeCookies);
		console.log(`RUN ${rNum} COMPLETE - ${iteration} Steps (${this.beautifyTime(Date.now() - runTime)}) - ${Game.handmadeCookies} Cookies --> Total Reward: ${Math.round(totalReward*100)/100}`)
		//if rNum < rMax
		to = setTimeout(() => {this.startRun()}, tickRate); // restart and continue training
	},
	train:async function(x, y){ // not used currently
		await this.network.fit(x, y);
	},


	// NEAT Network Methods

	getFitness:function(){
		return Game.handmadeCookies// + (maxiteration - nInvalid) * 10;
	},
	betterGen:function(){ //generation function always includes the best creature from all generations
		//make sure to choose 1 at random if there are equivalent creatures

		//this.crossover();
		for (let i = 0; i < this.neat.populationSize; i++) {
			this.neat.oldCreatures = Object.assign([], this.neat.creatures);
			let parentx = this.neat.pickCreature();
			let parenty = gbc ? gbc : this.neat.pickCreature();

			let genes = this.neat.crossoverMethod(parentx.flattenGenes(), parenty.flattenGenes());
			this.neat.creatures[i].setFlattenedGenes(genes);
		}

		//this.mutate();
		for (let i = 0; i < this.neat.populationSize; i++) {
			let genes = this.neat.creatures[i].flattenGenes();
			genes = this.neat.mutationMethod(genes, this.neat.mutationRate);
			this.neat.creatures[i].setFlattenedGenes(genes);
		}

		this.neat.generation++;
	},


	// NEAT Flow Control Methods

	startNEAT:function(){
		console.log(`Starting New NEAT Run (#${cIndex})`);// - Gen ${this.neat.generation}`);
		this.AIload();
		//console.time('runtime'); //start run timer
		to = setTimeout(() => {this.continueNEAT()}, tickRate); //delay since things might break otherwise?
		cLog = ``; //reset log of creature actions
		nInvalid = 0;
	},
	continueNEAT:function(){
		if (to) {clearTimeout(to);}
		if (stop) {return;}
		if (iteration >= maxiteration) { // || Game.cookieClicks >= maxClicks
			this.endNEAT();
		} else {
			iteration++;
			let c = this.neat.creatures[cIndex];
			c.setInputs([Game.cookies, iteration], cIndex); //, Game.cookiesPs], cIndex);
			c.feedForward();
			let d = c.desicion();
			//console.log(`Decision: ${d}`);
			//for (let i = d.length - 1; i >= 0; i--) { //try most expensive items first to speed up iteration
			//	if (d[i] === 1) {
			//		this.AIbuyThing(i);
			//		break;
			//	}
			//}
			if (d < 0 || d > 6) {console.error(`ERROR: decision outside of valid range: ${d}`);}
			let p = pi2index[d]
			if (!this.AIcanBuyThing(p)) {
				nInvalid++; //penalize fitness for wasting ticks on invalid actions
			} else { //valid action
				cLog = cLog + `${p}, `; //add to list
			}
			this.AIbuyThing(p); //ASSUME EVERY DECISION IS AN INPUT
			//if (Game.cookieClicks < maxClicks && iteration < maxiteration) {
			to = setTimeout(() => {this.continueNEAT()}, tickRate);
		}
	},
	endNEAT:function(){
		let c = this.neat.creatures[cIndex];
		let f = this.getFitness()
		console.log(`Actions (${nInvalid} invalid): ${cLog}`)
		console.warn(`Gen ${this.neat.generation} NEAT Run #${cIndex} Done - Fitness score: ${f}`)
		this.neat.setFitness(f, cIndex);
		//console.timeEnd('runtime'); //time elapsed should automatically show in console, (this doesn't return value)
		cIndex++;
		iteration = 0;
		if (cIndex >= nCreatures) { //end generation
			//console.log(`Generation #${this.neat.generation} Complete!`); // - Best # of Cookies: ${bcs}
			let run = cIndex;
			cIndex = 0;
			//this.neat.doGen(); //console should log with gen #
			this.betterGen();

			let tbc = this.neat.oldCreatures[this.neat.bestCreature()];
			console.log(`TBC score: ${tbc ? tbc.score : '(undefined)'} vs GBC score: ${gbc ? gbc.score : '(undefined)'}`);
			if (!gbc || tbc.score >= gbc.score) {
				console.log(`New generational best creature (score: ${tbc ? tbc.score : '(gen 0)'}) vs old score: ${gbc ? gbc.score : 0}`);
				//deepcopy tbc for future generations
				gbc = new Creature(this.neat.model);
				gbc.setFlattenedGenes(tbc.flattenGenes());
				gbc.score = tbc.score;
				gbc.gen = this.neat.generation;
				gbc.run = run;
			}
			console.error(`Best Gen ${this.neat.generation} Creature = #${this.neat.bestCreature()} (${tbc.score} score)`);
			plot.push(tbc.score); //track best from each generation
			//aggregation stats?
		}
		this.startNEAT(); //here we go again
	},
	resumeNEAT:function(){
		stop = false;
		this.continueNEAT();
	},
});

//Game.Notify('CCWRAI Loaded!','',0,4);

//-----Usage-----//
//Load with bookmark:
//javascript:(function() { Game.LoadMod('https://base-thomas.github.io/CCWRAI.js'); }());
//Game.mods['CCWRAI'].stopRun();
//etc
