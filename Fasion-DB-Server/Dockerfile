FROM node:18

# Enable Corepack and install Yarn 4.9.2
RUN corepack enable && corepack prepare yarn@4.9.2 --activate

# Set working directory
WORKDIR /app

# Copy files
COPY package.json yarn.lock ./
COPY . .

# Install dependencies using Yarn 4
RUN yarn install

# Expose port and run app
EXPOSE 5000
CMD ["yarn", "run", "dev"]
