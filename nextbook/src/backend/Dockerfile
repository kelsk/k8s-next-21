# Use base Python image from Docker Hub
FROM python:3.8 as base

# Set the working directory to /app
WORKDIR /app

# copy the requirements file used for dependencies
COPY requirements.txt .

# Install any needed packages specified in requirements.txt
RUN pip install --trusted-host pypi.python.org -r requirements.txt

##################
FROM base as prod

ENV FLASK_ENV=production

# Copy the rest of the working directory contents into the container at /app
COPY . .

# Run back.py when the container launches
ENTRYPOINT ["python", "back.py"]

##################
FROM base as dev

# Set to development mode to enable reloading
ENV FLASK_ENV=development

# Copy the rest of the working directory contents into the container at /app
COPY . .

# Run back.py when the container launches
ENTRYPOINT ["python", "back.py"]
