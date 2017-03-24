PIN=$1

#   Exports pin to userspace
echo $PIN > /sys/class/gpio/export                  

# Sets pin PIN as an output
echo "out" > /sys/class/gpio/gpio$PIN/direction
