#!/bin/bash

# Array of model names
models=("Cards" "CardTypes" "Cities" "UsersAttributes" "UsersBlockedUsers" "UsersMoments" "UsersMomentsOptions" "UsersPinnedFriends" "UsersPods" "UsersPreviousCities" "UsersPreviousMajorCities" "Attributes" "FriendRequests" "Friendships" "Invites" "MomentOptions" "Pods" "Popups" "QuizAnswers" "Quizzes" "Users")

# Function to process a model
process_model() {
  model=$1
  ts-node -r tsconfig-paths/register /Users/vince/playground/src/openai/jobs/transform-entities/index.ts $model
}

# Process models with 3x parallelism
for ((i=0; i<${#models[@]}; i+=3)); do
  process_model ${models[i]} &
  ((i+1<${#models[@]})) && process_model ${models[i+1]} &
  ((i+2<${#models[@]})) && process_model ${models[i+2]} &
  wait
done
